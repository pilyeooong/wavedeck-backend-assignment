import { ErrorRequestHandler } from 'express';
import logger from 'logger';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(`${req.transactionId} ${err.stack} ${err.message}`);

  res.status(err.statusCode).json({ error: { message: err.message } });
};

export default errorHandler;
