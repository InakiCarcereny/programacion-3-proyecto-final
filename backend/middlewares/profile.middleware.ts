import { Request, Response, NextFunction } from "express";

export const validateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, description } = req.body;

  const errors: string[] = [];

  if (name !== undefined) {
    if (typeof name !== "string") {
      errors.push("El nombre debe ser un texto.");
    } else if (name.length > 50) {
      errors.push("El nombre no puede superar los 50 caracteres.");
    }
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("La descripción debe ser un texto.");
  }

  if (errors.length > 0) {
    res.status(400).json({
      message: "Error de validación",
      errors,
    });
    return;
  }

  next();
};
