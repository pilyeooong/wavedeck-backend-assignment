import express from 'express';
import apiRouter from 'routes/apiRouter';
import adminRouter from 'routes/adminRouter';

const router = express.Router();

router.use('/admin', adminRouter);
router.get('/', (req, res) => {
  res.status(200).send('Server is running properly.');
});
router.use('/api/v1', apiRouter);

export default router;
