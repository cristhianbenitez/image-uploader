const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

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
app.use('/images', express.static('images'));
app.use(cors());

const Images = require('./models/images');

app.post('/images', upload.single('image'), async (req, res) => {
  if (!req.file) {
    console.log('No image received');

    return res.send({
      success: false
    });
  } else {
    console.log('image received');

    const image = new Images({
      _id: new mongoose.Types.ObjectId(),
      image: req.file.path
    });

    await image.save();

    return res.send({
      success: true,
      createdProduct: {
        _id: image._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/images/' + image._id
        }
      }
    });
  }
});

app.get('/images/:id', async (req, res, next) => {
  const id = req.params.id;
  const { image } = await Images.findById(id);

  res.json(image);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

module.exports = app;
