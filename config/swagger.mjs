import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Whistleblower API',
      version: '1.0.0',
      description: 'API for managing whistleblower reports',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.mjs'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
