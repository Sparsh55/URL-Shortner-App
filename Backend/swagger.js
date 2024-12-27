import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerOptions from'./swaggerOptions.js';

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const swaggerDocsMiddleware = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swaggerDocsMiddleware;
