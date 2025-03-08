import logger from 'logger';
import morgan from 'morgan';
import { Request } from 'express';
import { randomUUID } from 'crypto';

morgan.token('transactionId', (req: Request) => req.transactionId || randomUUID());

// morgan에서 제공하는 format 가이드
// https://expressjs.com/en/resources/middleware/morgan.html
const format =
  process.env.NODE_ENV === 'production'
    ? ':transactionId :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'
    : ':transactionId :method :url :status :response-time ms - :res[content-length]';

// 모든 http 요청을 로깅 미들웨어로 스트림 합니다.
const morganMiddleware = morgan(format, {
  stream: {
    write: (message) => logger.http(message),
  },
});

export default morganMiddleware;
