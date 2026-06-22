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

const router: IRouter = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), validateCreateProduct, createProduct);
router.put(
  "/:id",
  upload.single("image"),
  validateUpdateProduct,
  updateProduct,
);
router.delete("/:id", deleteProduct);

export default router;
