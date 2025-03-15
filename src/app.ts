import express from 'express';
import sequelize from 'database';
import router from 'routes';
import errorHandler from 'errors/errorHandler';
import morganMiddleware from 'middlewares/morganMiddleware';
import transactionIdMiddleware from 'middlewares/transactionIdMiddleware';
import bodyParser from 'body-parser';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import queue from 'jobs/queue';

const BULL_BOARD_PATH = process.env.BULL_BOARD_PATH || '/admin/queues';

const createApp = async () => {
  const app = express();

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(BULL_BOARD_PATH);

  await sequelize.authenticate();

  createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter: serverAdapter,
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(transactionIdMiddleware);
  app.use(morganMiddleware);
  app.use(BULL_BOARD_PATH, serverAdapter.getRouter());
  app.use(router);
  app.use(errorHandler);

  return app;
};

export default createApp;
