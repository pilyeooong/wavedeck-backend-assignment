import express from 'express';
import uploadMiddleware from 'middlewares/uploadMiddleware';
import { createAudioFile, destroyAudioFile } from 'controllers/commonController';

const commonRouter = express.Router();

commonRouter.post('/upload/audio', uploadMiddleware.single('file'), createAudioFile);
commonRouter.delete('/upload/audio/:fileId', destroyAudioFile);

export default commonRouter;
