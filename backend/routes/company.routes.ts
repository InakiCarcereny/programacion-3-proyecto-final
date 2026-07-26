import { Router, IRouter } from "express";
import {
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller";

import upload from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { validateCompany } from "../middlewares/company.middleware";
const router: IRouter = Router();

router.get("/:id", authenticate, getCompanyById);
router.put(
  "/:id",
  authenticate,
  upload.single("logo"),
  validateCompany,
  updateCompany,
);

export default router;
