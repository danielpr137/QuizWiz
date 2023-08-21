const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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