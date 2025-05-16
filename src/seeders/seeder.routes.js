// src/seeders/seeder.routes.js
const express = require('express');
const router = express.Router();
const seedProducts = require('./productSeeder');

// Ruta para poblar la base de datos con productos aleatorios
router.post('/productos', async (req, res) => {
    try {
        // Por defecto crea 70 productos, pero se puede especificar una cantidad diferente
        const quantity = req.query.quantity ? parseInt(req.query.quantity) : 70;
        
        const result = await seedProducts(quantity);
        
        res.status(201).json({
            success: true,
            message: `Se han creado ${result.length} productos exitosamente`,
            count: result.length
        });
    } catch (error) {
        console.error('Error al ejecutar el seeder:', error);
        res.status(500).json({
            success: false,
            message: 'Error al ejecutar el seeder',
            error: error.message
        });
    }
});

module.exports = router;
