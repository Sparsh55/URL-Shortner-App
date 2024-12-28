const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'URL-Shortner API',
        version: '1.0.0',
        description: "API's documentation for URL shortener app",
        contact: {
          name: 'Sparsh',
          email: 'sparshsaxena9654@gmail.com',
          url: 'http://localhost:5600',
        },
      },
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
  };
  
export default swaggerOptions;
  