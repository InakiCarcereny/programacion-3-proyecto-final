import { Router, IRouter } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/product.middleware";

import upload from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductById);
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validateCreateProduct,
  createProduct,
);
router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  validateUpdateProduct,
  updateProduct,
);
router.delete("/:id", authenticate, deleteProduct);

export default router;
