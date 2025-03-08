import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

// 어플리케이션 서버로의 모든 요청마다 고유한 id 값을 부여합니다.
const transactionIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.transactionId = randomUUID();
  res.locals.transactionId = req.transactionId;
  next();
};

export default transactionIdMiddleware;
