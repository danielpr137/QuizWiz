const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Define storage settings for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

a