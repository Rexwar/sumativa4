// token.js
const jwt = require('jsonwebtoken');
const  JWTSECRET  = process.env.JWT_SECRET; 

// Función para generar un token con expiración de 2 meses
function generarToken2Meses() {
  // Definir el tiempo de expiración en 2 meses (60 días)
  const expirationTime = '60d';  // Esto representa 60 días, que son aproximadamente 2 meses

  // Tu clave secreta para firmar el token (cámbiala por algo más seguro en producción)
  const secretKey = JWTSECRET;

  // Crear el token sin payload (sin datos adicionales)
  const token = jwt.sign({"user": "ola"}, secretKey, { expiresIn: expirationTime });

  return token;
}

module.exports = generarToken2Meses;
