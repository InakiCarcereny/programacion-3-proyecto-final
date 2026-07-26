import { Router, IRouter } from "express";

import {
  getDetailsByUserId,
  updateDetails,
} from "../controllers/user-detail.controller";

import upload from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { validateUserDetails } from "../middlewares/user-detail.middleware";
const router: IRouter = Router();

router.get("/:userId", authenticate, getDetailsByUserId);
router.put(
  "/:userId",
  authenticate,
  upload.single("avatar"),
  validateUserDetails,
  updateDetails,
);

export default router;
