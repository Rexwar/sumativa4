// Middleware para crear productos (completo)
const validateCreateProduct = (req, res, next) => {
    const { nombre, sku, precio, stock } = req.body;
    
    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !sku || !precio || stock === undefined) {
        return res.status(400).json({ message: 'Todos los campos son requeridos para crear un producto' });
    }

    // Validar tipos (esto no lo hace bien Mongoose antes de la conversión)
    if (typeof precio !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({ message: 'Precio y stock deben ser números' });
    }

    next();
};

// Middleware para actualizar productos (parcial)
const validateUpdateProduct = (req, res, next) => {
    const { precio, stock } = req.body;
    
    // Solo validar los campos que están presentes
    if (precio !== undefined && typeof precio !== 'number') {
        return res.status(400).json({ message: 'Precio debe ser un número' });
    }
    
    if (stock !== undefined && typeof stock !== 'number') {
        return res.status(400).json({ message: 'Stock debe ser un número' });
    }

    next();
};

module.exports = {
    validateCreateProduct,
    validateUpdateProduct
};
