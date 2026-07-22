import { Router, IRouter } from "express";
import {
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/:id", getCompanyById);
router.put("/:id", upload.single("logo"), updateCompany);

export default router;
