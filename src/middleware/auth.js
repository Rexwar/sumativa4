const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; 

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  //console.log('Token recibido:', token); // Agregado para depuración

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado, se requiere un token válido.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    //console.error('Error al verificar el token:', error); // Agregado para depuración
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = jwtMiddleware;
