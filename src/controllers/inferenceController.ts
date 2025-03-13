import { NextFunction, Request, Response } from 'express';

export const requestSts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, fileId, voiceId, pitch } = req.body;
    console.log(userId);
    console.log(fileId);
    console.log(voiceId);
    console.log(pitch);
    res.status(200).send('request sts');
  } catch (e) {
    next(e);
  }
};
