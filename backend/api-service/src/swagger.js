const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NASA CGI API Proxy',
    version: '1.0.0',
    description: 'Express backend proxy for NASA CGI Open APIs (APOD, Mars Rover Photos, etc.)',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [ './src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;