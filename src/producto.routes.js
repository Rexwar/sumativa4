// routes/producto.routes.js
const express = require('express');
const router = express.Router();
const productoController = require('./producto.controller');
const jwtMiddleware = require('./middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('./middleware/validateProduct');

router.post('/', jwtMiddleware, validateCreateProduct, productoController.crearProducto);
router.get('/', jwtMiddleware, productoController.obtenerProductos);
router.get('/:id', jwtMiddleware, productoController.obtenerProductoPorId);
router.patch('/:id', jwtMiddleware, validateUpdateProduct, productoController.actualizarProducto);
router.delete('/:id', jwtMiddleware, productoController.eliminarProducto);

module.exports = router;
