// server.js
require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('🚀 Base de datos conectada correctamente en Filessio');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
.catch(err => console.error('❌ Error al conectar con la base de datos:', err));
