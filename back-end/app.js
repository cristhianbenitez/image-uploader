const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a valid image file'));
    }
    cb(undefined, true);
  }
});

app.use(cors());

app.post('/image', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log('No image received');
    return res.send({
      success: false
    });
  } else {
    console.log('image received');
    return res.send({
      success: true,
      filename: req.file.filename
    });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

module.exports = app;
