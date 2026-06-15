import { Request, Response, NextFunction } from "express";

export const validateMovement = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { productId, quantity, type, description } = req.body;
  const errors: string[] = [];

  if (!productId || typeof productId !== "number") {
    errors.push("El ID del producto es obligatorio y debe ser un número.");
  }

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    errors.push("La cantidad es obligatoria y debe ser mayor a 0.");
  }

  if (!type || (type !== "ingreso" && type !== "egreso")) {
    errors.push("El tipo es obligatorio y debe ser 'ingreso' o 'egreso'.");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("La descripción debe ser un texto.");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Error de validación", errors });
    return;
  }

  next();
};
