import express from 'express';
import commonRouter from 'routes/commonRouter';
import inferenceRouter from 'routes/inferenceRouter';

const apiRouter = express.Router();

apiRouter.use('/common', commonRouter);
apiRouter.use('/inference', inferenceRouter);

export default apiRouter;
