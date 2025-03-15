import express from 'express';
import { requestSts } from 'controllers/inferenceController';

const inferenceRouter = express.Router();

inferenceRouter.post('/sts', requestSts);

export default inferenceRouter;
