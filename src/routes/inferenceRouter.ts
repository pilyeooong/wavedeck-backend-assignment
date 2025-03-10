import express from 'express';

const inferenceRouter = express.Router();

inferenceRouter.get('/sts', (req, res, _) => {
  res.status(200).send('sts');
});

export default inferenceRouter;
