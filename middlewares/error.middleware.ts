import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

export function errorHandler(
  err: Error | ValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.log(`[SERVER ERROR]: ${err.message}`);

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map((e) => ({
        message: e.message,
        field: e.path,
        value: e.value,
      })),
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}
