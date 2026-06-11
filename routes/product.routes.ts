import { Router, IRouter } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { validateProduct } from "../middlewares/product.validator";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), validateProduct, createProduct);
router.put("/:id", upload.single("image"), validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
