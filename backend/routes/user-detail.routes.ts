import { Router, IRouter } from "express";

import {
  getDetailsByUserId,
  updateDetails,
} from "../controllers/user-detail.controller";

import upload from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/:userId", authenticate, getDetailsByUserId);
router.put("/:userId", authenticate, upload.single("avatar"), updateDetails);

export default router;
