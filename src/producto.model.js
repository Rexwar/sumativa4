// models/producto.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productoSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    nombre: { 
        type: String, 
        required: [true, 'El nombre es requerido'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    sku: {
        type: String,
        required: [true, 'El SKU es requerido'],
        unique: true,
        maxlength: [30, 'El SKU no puede exceder los 30 caracteres']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [1, 'El precio debe ser mayor a 0']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es requerido'],
        min: [0, 'El stock no puede ser negativo']
    },
    activo: { type: Boolean, default: true }
}, { versionKey: false });

module.exports = mongoose.model('Producto', productoSchema);
