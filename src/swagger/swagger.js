// src/swagger/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Descripción de mi API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Referencia a todos los archivos JS en la carpeta 'routes'
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
