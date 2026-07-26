import { Request, Response, NextFunction } from "express";

export const validateCompany = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, description, logoUrl } = req.body;

  const errors: string[] = [];

  if (name !== undefined) {
    if (typeof name !== "string") {
      errors.push("El nombre debe ser un texto.");
    } else if (name.trim().length === 0) {
      errors.push("El nombre es obligatorio.");
    } else if (name.length > 150) {
      errors.push("El nombre no puede superar los 150 caracteres.");
    }
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("La descripción debe ser un texto.");
  }

  if (logoUrl !== undefined && typeof logoUrl !== "string") {
    errors.push("La URL del logo debe ser un texto.");
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
