import { Request, Response, NextFunction } from "express";
import { Product } from "../models";
import { uploadImage } from "../utils/upload-image";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { search, category } = req.query;

    const products = await Product.findAllProducts(
      search as string | undefined,
      category as string | undefined,
    );

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const product = await Product.findProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "products");
    }

    const product = await Product.createProduct({ ...req.body, imageUrl });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "products");
    }

    const product = await Product.updateProduct(id, {
      ...req.body,
      ...(imageUrl && { imageUrl }),
    });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const deleted = await Product.deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}
