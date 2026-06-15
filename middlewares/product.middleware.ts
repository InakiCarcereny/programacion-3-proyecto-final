import { Request, Response, NextFunction } from "express";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;
  const errors: string[] = [];

  if (!name || typeof name !== "string" || name.length > 150) {
    errors.push(
      "El nombre es obligatorio, debe ser texto y tener máximo 150 caracteres.",
    );
  }

  if (price === undefined || typeof price !== "number" || price <= 0) {
    errors.push("El precio es obligatorio y debe ser un número mayor a 0.");
  }

  if (!categoryId || typeof categoryId !== "number") {
    errors.push("El ID de la categoría es obligatorio y debe ser un número.");
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    errors.push("El stock debe ser un número positivo.");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("La descripción debe ser un texto.");
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    errors.push("La URL de la imagen debe ser un texto válido.");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Error de validación", errors });
    return;
  }

  next();
};
