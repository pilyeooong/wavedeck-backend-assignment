import express from 'express';
import sequelize from 'database';
import router from 'routes';
import errorHandler from 'errors/errorHandler';

const createApp = async () => {
  const app = express();

  await sequelize.authenticate();

  app.use(router);
  app.use(errorHandler);

  return app;
};

export default createApp;
