const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

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
    fs.readFile(__dirname + '/upload-response.html', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });