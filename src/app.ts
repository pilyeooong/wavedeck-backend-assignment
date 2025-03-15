import express from 'express';
import sequelize from 'database';
import router from 'routes';
import errorHandler from 'errors/errorHandler';
import morganMiddleware from 'middlewares/morganMiddleware';
import transactionIdMiddleware from 'middlewares/transactionIdMiddleware';
import bodyParser from 'body-parser';

const createApp = async () => {
  const app = express();

  await sequelize.authenticate();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(transactionIdMiddleware);
  app.use(morganMiddleware);
  app.use(router);
  app.use(errorHandler);

  return app;
};

export default createApp;
