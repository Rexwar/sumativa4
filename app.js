// app.js
require('dotenv').config();

//const creatoken = require('./src/token');

const express = require('express');
const cors = require('cors');
const productoRoutes = require('./src/producto.routes');
const seederRoutes = require('./src/seeders/seeder.routes');

const app = express();

//console.log( creatoken());

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/seeders', seederRoutes);

module.exports = app;
