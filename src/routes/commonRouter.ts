import express from 'express';

const commonRouter = express.Router();

commonRouter.get('/upload/audio', (req, res, _) => {
  res.status(200).send('common upload');
});

export default commonRouter;
