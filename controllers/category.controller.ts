import { Request, Response, NextFunction } from "express";
import { Category } from "../models";

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const categories = await Category.findAllCategories();

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

    const category = await Category.findCategoryById(id);
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
    const category = await Category.createCategory(req.body);

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

    const category = await Category.updateCategory(id, req.body);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json({ message: "Category updated successfully", category });
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

    const deleted = await Category.deleteCategory(id);
    if (!deleted) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
}
