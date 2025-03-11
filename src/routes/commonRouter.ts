import express from 'express';
import uploadMiddleware from 'middlewares/uploadMiddleware';
import { createFile } from 'controllers/commonController';

const commonRouter = express.Router();

commonRouter.post('/upload/audio', uploadMiddleware.single('file'), createFile);

export default commonRouter;
