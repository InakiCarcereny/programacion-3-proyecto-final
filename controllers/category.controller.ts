import { Request, Response, NextFunction } from "express";
import { Category } from "../models";

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    await category.update(req.body);

    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    await category.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
