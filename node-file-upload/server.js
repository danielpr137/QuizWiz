const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Google login
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const port = 3000;

///////////////////////////////////////////////
app.use(session({
    secret: 'your_secret_string_here',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // You can store user details (profile) in your database here.
    return done(null, profile);
}));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful login.
    res.redirect('/'); // Or wherever you want to redirect the user after a successful login.
});
///////////////////////////////////////////////

// Sotrage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage});

// Get index HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle file upload including feedback
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.send(`
            <html>
                <body>
                    <div class="message">
                        No file was selected for upload.<br>
                        <a href="/" class="home-button">Go Back</a>
                    </div>
                </body>
            </html>
        `);
    }

    fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
    
        let fileListHTML = files.map(file => `<li>${file}</li>`).join('');
    
        fs.readFile(__dirname + '/upload-response.html', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            
            const updatedData = data.replace(
                'File uploaded successfully! <br>',
                `<div class="message">
                File uploaded successfully! <br>
                <div class="files-container"><h2>Uploaded Files:</h2><ul>${fileListHTML}
                </ul></div>`
            );            
    
            res.send(updatedData);
        });
    });
    
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });