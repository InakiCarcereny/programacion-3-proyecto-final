import { Request, Response, NextFunction } from "express";

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { email, password, isActive, companyId, profileId } = req.body;

  const errors: string[] = [];

  if (email !== undefined) {
    if (typeof email !== "string") {
      errors.push("El email debe ser un texto.");
    } else if (!email.includes("@")) {
      errors.push("El email no es válido.");
    }
  }

  if (password !== undefined) {
    if (typeof password !== "string" || password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive debe ser verdadero o falso.");
  }

  if (companyId !== undefined) {
    const id = Number(companyId);

    if (isNaN(id)) {
      errors.push("companyId debe ser un número.");
    } else {
      req.body.companyId = id;
    }
  }

  if (profileId !== undefined) {
    const id = Number(profileId);

    if (isNaN(id)) {
      errors.push("profileId debe ser un número.");
    } else {
      req.body.profileId = id;
    }
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
