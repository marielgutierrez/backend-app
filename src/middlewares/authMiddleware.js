const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const authHeader = req.headers.authorization;
      const parts = authHeader.split(' ');

      // ERROR #5 DELIBERADO: Se extrae parts[0] ("Bearer") en lugar de parts[1] (el token JWT real).
      // Esto hace que jwt.verify falle siempre lanzando "jwt malformed" o token inválido en rutas protegidas.
      token = parts[0];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_famous_songs_key_2026');
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'No autorizado, token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado, falta el encabezado de token Bearer' });
  }
};

module.exports = { protect };
