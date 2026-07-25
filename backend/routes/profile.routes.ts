import { Router, IRouter } from "express";
import {
  getProfiles,
  getProfileByName,
} from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getProfiles);
router.get("/:name", authenticate, getProfileByName);

export default router;
