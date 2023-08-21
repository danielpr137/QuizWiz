const express = require('express');
const multer = require('multer');

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
    res.send(`
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  background-color: #121212;
                  font-family: 'Courier New', Courier, monospace;
                  color: #ffffff;
                  text-align: center;
                  padding-top: 10%;
              }

              .message {
                  background-color: #252525;
                  border: 1px solid #3a3a3a;
                  padding: 20px;
                  border-radius: 5px;
                  display: inline-block;
              }

              .home-button {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s;
              }

              .home-button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="message">
              File uploaded successfully! <br>
              <a href="/" class="home-button">Home Page</a>
          </div>
          <script>
              const messageElement = document.querySelector(".message");
              messageElement.animate([
                  { opacity: 0, transform: 'translateY(-40px)' },
                  { opacity: 1, transform: 'translateY(0)' }
              ], {
                  duration: 800,
                  easing: 'ease-out',
                  fill: 'forwards'
              });
          </script>
      </body>
      </html>
    `);
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });