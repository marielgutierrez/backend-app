const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la canción es obligatorio'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'El artista es obligatorio'],
    trim: true
  },
  album: {
    type: String,
    trim: true,
    default: 'Single'
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > new Date().getFullYear();
      },
      message: props => `${props.value} no es un año de lanzamiento válido (debe ser mayor al año actual)`
    }
  },
  durationSeconds: {
    type: Number,
    required: true
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  ratings: [{
    score: { type: Number, min: 1, max: 5 },
    user: { type: String, default: 'Anonymous' },
    date: { type: Date, default: Date.now }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  isFamousClassic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
