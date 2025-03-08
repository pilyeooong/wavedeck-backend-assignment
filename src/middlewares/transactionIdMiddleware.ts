import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

const transactionIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.transactionId = randomUUID();
  res.locals.transactionId = req.transactionId;
  next();
};

export default transactionIdMiddleware;
