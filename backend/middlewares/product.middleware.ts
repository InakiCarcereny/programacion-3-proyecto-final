import { Request, Response, NextFunction } from "express";

export const validateCreateProduct = (
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

  const parsedPrice = Number(price);
  if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
    errors.push("El precio es obligatorio y debe ser un número mayor a 0.");
  }

  const parsedCategoryId = Number(categoryId);
  if (!categoryId || isNaN(parsedCategoryId)) {
    errors.push("El ID de la categoría es obligatorio y debe ser un número.");
  }

  const parsedStock = stock !== undefined ? Number(stock) : undefined;
  if (parsedStock !== undefined && (isNaN(parsedStock) || parsedStock < 0)) {
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

  req.body.price = parsedPrice;
  req.body.categoryId = parsedCategoryId;
  if (parsedStock !== undefined) req.body.stock = parsedStock;

  next();
};

export const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;
  const errors: string[] = [];

  if (name !== undefined && (typeof name !== "string" || name.length > 150)) {
    errors.push("El nombre debe ser texto y tener máximo 150 caracteres.");
  }

  if (price !== undefined) {
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      errors.push("El precio debe ser un número mayor a 0.");
    } else {
      req.body.price = parsedPrice;
    }
  }

  if (categoryId !== undefined) {
    const parsedCategoryId = Number(categoryId);
    if (isNaN(parsedCategoryId)) {
      errors.push("El ID de la categoría debe ser un número.");
    } else {
      req.body.categoryId = parsedCategoryId;
    }
  }

  if (stock !== undefined) {
    const parsedStock = Number(stock);
    if (isNaN(parsedStock) || parsedStock < 0) {
      errors.push("El stock debe ser un número positivo.");
    } else {
      req.body.stock = parsedStock;
    }
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
