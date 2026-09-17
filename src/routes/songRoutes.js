const express = require('express');
const router = express.Router();
const {
  getSongs,
  searchSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  rateSong,
  getSongStats
} = require('../controllers/songController');
const { protect } = require('../middlewares/authMiddleware');
const { defaultFilterMiddleware } = require('../middlewares/queryFilterMiddleware');

// Aplicar middleware de consulta predeterminada (contiene Error #10)
router.get('/', defaultFilterMiddleware, getSongs);
router.get('/search', searchSongs);
router.get('/:id', getSongById);
router.get('/:id/stats', getSongStats);

// Ruta protegida con JWT (contiene Error #5)
router.post('/', protect, createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.post('/:id/rate', rateSong);

module.exports = router;
