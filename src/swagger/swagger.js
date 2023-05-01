const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');

const routesContent = fs.readFileSync('./src/swagger/routes.yml', 'utf8');
const docs = YAML.parse(routesContent);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Descripción de mi API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: docs.components,
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
