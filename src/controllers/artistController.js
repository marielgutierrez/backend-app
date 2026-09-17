const Artist = require('../models/Artist');

// @desc    Obtener todos los artistas
// @route   GET /api/artists
const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find({});
    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener artista por ID
// @route   GET /api/artists/:id
const getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artista no encontrado' });
    }
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un nuevo artista
// @route   POST /api/artists
const createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArtists,
  getArtistById,
  createArtist
};
