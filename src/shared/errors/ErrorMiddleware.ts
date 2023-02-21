import Error from './Error';
import { NextFunction, Request, Response } from 'express';

function verifyError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log('Hit on error middleware');
  if (error instanceof Error) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}

export default verifyError;
