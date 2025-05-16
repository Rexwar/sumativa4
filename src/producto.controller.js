// controllers/producto.controller.js
const Producto = require('./producto.model');

// Crear producto
const crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El SKU ya existe' });
        }
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Leer todos los productos
const obtenerProductos = async (req, res) => {
    try {
        // Parámetros de paginación con valores por defecto
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Validar parámetros
        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({ 
                message: 'Parámetros inválidos: page debe ser ≥1 y limit entre 1-100'
            });
        }

        // Consulta con paginación
        const [productos, total] = await Promise.all([
            Producto.find({ activo: true })
                .select('-_id -__v')
                .skip((page - 1) * limit)
                .limit(limit),
            Producto.countDocuments({ activo: true })
        ]);

        // Calcular total de páginas
        const totalPages = Math.ceil(total / limit);

        // Respuesta con metadatos de paginación
        res.status(200).json({
            data: productos,
            pagination: {
                totalItems: total,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Leer producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(400).json({ message: error.message });
    }
};

// Eliminar producto (soft delete)
const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findOneAndUpdate({ id: req.params.id }, { activo: false }); // soft delete
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
