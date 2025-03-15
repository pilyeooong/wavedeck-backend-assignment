import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import queue from 'jobs/queue';
import { ExpressAdapter } from '@bull-board/express';
import { getQueueStatus } from 'controllers/adminController';

const adminRouter = express.Router();

const BULL_BOARD_PATH = process.env.BULL_BOARD_PATH || '/admin/queues/dashboard';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(BULL_BOARD_PATH);

createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter: serverAdapter,
});

adminRouter.get('/queues/status', getQueueStatus);
adminRouter.use('/queues/dashboard', serverAdapter.getRouter());

export default adminRouter;
