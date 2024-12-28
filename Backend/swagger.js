import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Setup Swagger docs
 * @param {Object} app - Express app instance
 */
const swaggerDocsMiddleware = (app) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.1', // OpenAPI 3.0 specification
      info: {
        title: 'URL Shortener API',
        version: '1.0.0',
        description: 'API documentation for the URL shortening service with Google OAuth integration.',
        contact: {
          name: 'Your Name',
          email: 'your.email@example.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:5600', // Base URL for API
        },
      ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js', '/src/models/*.js'], // Path to your API route files
  };

  const specs = swaggerJsdoc(swaggerOptions);

  // Serve Swagger API docs at `/api-docs`
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  console.log('Swagger API docs are available at /api-docs');
};

export default swaggerDocsMiddleware;
