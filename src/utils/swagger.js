const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: { title: 'Team Finder Swagger', version: '1.0.0' },
    openapi: '3.1.0',
  },
  apis: [],
};

const swaggerSpecification = swaggerJsdoc(options);

module.exports = { swaggerSpecification };
