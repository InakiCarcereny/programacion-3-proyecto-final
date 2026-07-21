import { Router, IRouter } from "express";

import {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller";

// import {
//   validateCreateProfile,
//   validateUpdateProfile,
// } from "../middlewares/profile.middleware";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.post(
  "/",
  upload.single("image"),
  /* validateCreateProfile,*/ createProfile,
);
router.put(
  "/:id",
  upload.single("image"),
  /*validateUpdateProfile, */
  updateProfile,
);
router.delete("/:id", deleteProfile);

export default router;
