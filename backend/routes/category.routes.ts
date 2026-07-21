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
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getCategories);
router.get("/:id", authenticate, getCategoryById);
router.post("/", authenticate, validateCreateCategory, createCategory);
router.put("/:id", authenticate, validateUpdateCategory, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
