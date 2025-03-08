import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  res.status(err.statusCode).json({ error: { message: err.message } });
};

export default errorHandler;
