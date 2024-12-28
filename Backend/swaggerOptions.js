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
          url: 'https://url-shortner-app-rbyi.onrender.com',
        },
      },
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
  };
  
export default swaggerOptions;
  