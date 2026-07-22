import { Router, IRouter } from "express";
import {
  getProfiles,
  getProfileByName,
} from "../controllers/profile.controller";

const router: IRouter = Router();

router.get("/", getProfiles);
router.get("/:name", getProfileByName);

export default router;
