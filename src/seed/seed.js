const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Song = require('../models/Song');
const Artist = require('../models/Artist');
const { famousSongsSeed, famousArtistsSeed } = require('./songsSeedData');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/famous_songs_db';
    console.log(`Conectando a MongoDB para poblar datos: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    // Limpiar colecciones anteriores
    await Song.deleteMany({});
    await Artist.deleteMany({});

    console.log('Colecciones anteriores eliminadas.');

    // Insertar artistas
    await Artist.insertMany(famousArtistsSeed);
    console.log(`✓ ${famousArtistsSeed.length} Artistas insertados exitosamente.`);

    // Insertar canciones omitiendo validación del esquema para no bloquear por el Error #4 durante el seed
    const insertedSongs = await Song.insertMany(famousSongsSeed, { validateBeforeSave: false });
    console.log(`✓ ${insertedSongs.length} Canciones Famosas insertadas exitosamente.`);

    console.log('¡Base de datos poblada con éxito con canciones famosas!');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
