const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Rutas
const songRoutes = require('./routes/songRoutes');
const artistRoutes = require('./routes/artistRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoint base de bienvenida
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API REST - Canciones Famosas (Backend con errores de prueba)',
    documentation: '/api/songs, /api/artists'
  });
});

// Montar Rutas
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);

// Manejador 404 para rutas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app;
