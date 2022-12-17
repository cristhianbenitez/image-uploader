const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String, required: true }
});

module.exports = mongoose.model('images', imagesSchema);
