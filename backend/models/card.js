const mongoose = require('mongoose');
const validator = require('validator');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

CardSchema.path('link').validate((link) => validator.isURL(link), 'Укажите ссылку на изображение');

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('card', CardSchema);
