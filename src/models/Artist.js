const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del artista es obligatorio'],
    trim: true
  },
  country: {
    type: String,
    trim: true,
    default: 'Desconocido'
  },
  formedYear: {
    type: Number
  },
  genre: {
    type: String,
    trim: true
  },
  bio: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);
