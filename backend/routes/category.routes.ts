import { Router, IRouter } from "express";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../middlewares/category.middleware";

const router: IRouter = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", validateCreateCategory, createCategory);
router.put("/:id", validateUpdateCategory, updateCategory);
router.delete("/:id", deleteCategory);

export default router;
