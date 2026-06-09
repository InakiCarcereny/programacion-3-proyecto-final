import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Product, Category } from '../models';
import { uploadImage } from '../utils/upload-image';

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { search, category } = req.query;

    const where: Record<string, unknown> = {};

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    if (category) {
      where.categoryId = category;
    }

    const products = await Product.findAll({
      where,
      include: [{ model: Category, as: 'category' }],
    });

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
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: 'category' }],
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
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
      imageUrl = await uploadImage(req.file.buffer, 'products');
    }

    const product = await Product.create({
      ...req.body,
      imageUrl,
    });

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
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    let imageUrl: string | undefined;

    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, 'products');
    }

    await product.update({
      ...req.body,
      ...(imageUrl && { imageUrl }),
    });

    res.json(product);
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
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
