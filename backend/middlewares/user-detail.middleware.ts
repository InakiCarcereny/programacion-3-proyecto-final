import { Request, Response, NextFunction } from "express";

export const validateUserDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {
    firstName,
    lastName,

    avatarUrl,
    phone,
  } = req.body;

  const errors: string[] = [];

  if (firstName !== undefined && typeof firstName !== "string") {
    errors.push("El nombre debe ser un texto.");
  }

  if (lastName !== undefined && typeof lastName !== "string") {
    errors.push("El apellido debe ser un texto.");
  }

  if (avatarUrl !== undefined && typeof avatarUrl !== "string") {
    errors.push("La URL del avatar debe ser un texto.");
  }

  if (phone !== undefined && typeof phone !== "string") {
    errors.push("El teléfono debe ser un texto.");
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
