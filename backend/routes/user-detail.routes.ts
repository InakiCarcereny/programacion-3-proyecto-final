import { Router, IRouter } from "express";

import {
  getDetailsByUserId,
  updateDetails,
} from "../controllers/user-detail.controller";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/:userId", getDetailsByUserId);
router.put("/:userId", upload.single("avatar"), updateDetails);

export default router;
