// src/seeders/productSeeder.js
const { faker } = require('@faker-js/faker/locale/es');
const Producto = require('../producto.model');

const generateRandomSKU = () => {
    const prefix = faker.string.alpha({ length: 3, casing: 'upper' });
    const numbers = faker.string.numeric(5);
    return `${prefix}-${numbers}`;
};

const seedProducts = async (quantity = 70) => {
    try {
        // Clean existing products if needed
        await Producto.deleteMany({});
        
        const products = [];
        
        for (let i = 0; i < quantity; i++) {
            const product = {
                nombre: faker.commerce.productName(),
                sku: generateRandomSKU(),
                precio: faker.number.int({ min: 1000, max: 100000 }),
                stock: faker.number.int({ min: 0, max: 1000 }),
                activo: faker.datatype.boolean({ likelihood: 80 }) // 80% likely to be active
            };
            
            products.push(product);
        }
        
        const result = await Producto.insertMany(products);
        console.log(`✅ ${result.length} productos han sido creados exitosamente.`);
        return result;
    } catch (error) {
        console.error('❌ Error al crear productos:', error);
        throw error;
    }
};

module.exports = seedProducts;
