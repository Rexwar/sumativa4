# API REST de Productos - Sumativa 4

API REST desarrollada para la evaluación sumativa 4 de Arquitectura de Sistemas.

## Descripción

Esta API proporciona endpoints para la gestión de productos, incluyendo operaciones CRUD (Crear, Leer, Actualizar y Eliminar) con autenticación mediante tokens JWT.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MongoDB (local o remoto)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Rexwar/sumativa4.git
   cd sumativa4
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno (opcional):
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/productos
   JWT_SECRET=your_jwt_secret
   ```

## Ejecución

```bash
npm start
```

La API estará disponible en `http://localhost:3000`

## Endpoints

### Autenticación

- **POST /api/token**: Genera un token JWT para autenticación
  - Body: `{ "username": "admin", "password": "admin" }`

### Productos

- **GET /api/productos**: Obtiene todos los productos
- **GET /api/productos/:id**: Obtiene un producto por su ID
- **POST /api/productos**: Crea un nuevo producto (requiere token)
  - Body: `{ "nombre": "Producto", "precio": 1000, "stock": 10 }`
- **PUT /api/productos/:id**: Actualiza un producto existente (requiere token)
- **DELETE /api/productos/:id**: Elimina un producto (requiere token)

### Seeders

- **GET /api/seeders**: Carga datos de ejemplo en la base de datos

## Estructura del Proyecto

```
├── app.js              # Configuración de Express
├── server.js           # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── src/
    ├── middleware/     # Middleware de autenticación y validación
    ├── producto.model.js    # Modelo de datos
    ├── producto.controller.js # Controladores
    ├── producto.routes.js    # Definición de rutas
    ├── token.js        # Generación de tokens JWT
    └── seeders/        # Datos de ejemplo
```

## Tecnologías Utilizadas

- Express.js: Framework web
- MongoDB: Base de datos
- Mongoose: ODM para MongoDB
- JWT: Autenticación basada en tokens
- Joi: Validación de datos

## Autor

Rexwar - [GitHub](https://github.com/Rexwar)
