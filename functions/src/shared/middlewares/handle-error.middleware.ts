import { logger } from 'firebase-functions';
import { ErrorRequestHandler } from 'express';

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

export const errorResponder: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    statusCode,
    message: err.message,
    stack: JSON.stringify(err.stack, null, 4),
  });
};
