const Song = require('../models/Song');

// @desc    Obtener todas las canciones con paginación y filtros
// @route   GET /api/songs
const getSongs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // ERROR #1 DELIBERADO: Cálculo de paginación Off-by-one.
    // En lugar de ((page - 1) * limit), calcula (page * limit).
    // Esto provoca que en la página 1 se omitan los primeros "limit" registros.
    const skip = page * limit;

    let queryFilter = {};

    // ERROR #7 DELIBERADO: Operador de consulta invertido.
    // Si se especifican tanto el artista como el género, usa $or en lugar de $and.
    if (req.query.artist && req.query.genre) {
      queryFilter = {
        $or: [
          { artist: new RegExp(req.query.artist, 'i') },
          { genre: new RegExp(req.query.genre, 'i') }
        ]
      };
    } else {
      if (req.query.artist) queryFilter.artist = new RegExp(req.query.artist, 'i');
      if (req.query.genre) queryFilter.genre = new RegExp(req.query.genre, 'i');
    }

    const songs = await Song.find(queryFilter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Song.countDocuments(queryFilter);

    res.status(200).json({
      success: true,
      count: songs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: songs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Buscar canciones por título
// @route   GET /api/songs/search
const searchSongs = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Debe ingresar un parámetro de búsqueda "q"' });
    }

    // ERROR #3 DELIBERADO: Búsqueda por Regex sin sanitizar caracteres especiales ni bandera case-insensitive.
    // Si el usuario busca símbolos de regex como '(' o '*', MongoDB lanza un error de sintaxis en expresión regular.
    const songs = await Song.find({ title: { $regex: q } });

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener canción por ID
// @route   GET /api/songs/:id
const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Canción no encontrada' });
    }
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear una canción
// @route   POST /api/songs
const createSong = async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar datos de una canción
// @route   PUT /api/songs/:id
const updateSong = async (req, res, next) => {
  try {
    // ERROR #2 DELIBERADO: Falta la palabra clave `await` en la llamada a Mongoose.
    // `Song.findByIdAndUpdate` retorna una Query/Promise sin resolver.
    // La API responde HTTP 200 inmediatamente con un objeto Query en lugar de la canción modificada,
    // por lo que los cambios nunca se aplican ni persisten en MongoDB.
    const song = Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Canción actualizada',
      data: song
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar una canción
// @route   DELETE /api/songs/:id
const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({ success: false, message: 'Canción no encontrada para eliminar' });
    }

    // ERROR #8 DELIBERADO: Retorna código de estado HTTP 404 (Not Found) en lugar de HTTP 200/204 cuando la eliminación es EXITOSA.
    return res.status(404).json({
      success: true,
      message: 'Canción eliminada exitosamente de la base de datos'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Calificar una canción
// @route   POST /api/songs/:id/rate
const rateSong = async (req, res, next) => {
  try {
    const { score, user } = req.body;
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ success: false, message: 'La calificación debe ser entre 1 y 5' });
    }

    // ERROR #6 DELIBERADO: Uso de $set en lugar de $push o $addToSet para agregar una calificación.
    // En lugar de añadir una nueva nota al arreglo `ratings`, sobreescribe todo el arreglo por un único objeto.
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: { ratings: { score, user: user || 'Anónimo', date: new Date() } } },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ success: false, message: 'Canción no encontrada' });
    }

    res.status(200).json({
      success: true,
      message: 'Calificación agregada',
      data: updatedSong
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener estadísticas y promedio de una canción
// @route   GET /api/songs/:id/stats
const getSongStats = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Canción no encontrada' });
    }

    // ERROR #9 DELIBERADO: División por cero / NaN si la canción no tiene calificaciones.
    // Si ratings length es 0, calcula 0 / 0 produciendo NaN en averageRating y corrompiendo la respuesta JSON.
    const totalScore = song.ratings.reduce((acc, curr) => acc + curr.score, 0);
    const average = totalScore / song.ratings.length;

    song.averageRating = average;
    await song.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: {
        title: song.title,
        artist: song.artist,
        totalRatings: song.ratings.length,
        averageRating: average,
        viewsCount: song.viewsCount
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSongs,
  searchSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  rateSong,
  getSongStats
};
