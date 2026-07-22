import { Router, IRouter } from "express";

import {
  getUserDetails,
  getUserDetailsById,
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
} from "../controllers/user-detail.controller";

// import {
//   validateCreateUserDetail,
//   validateUpdateUserDetail,
// } from "../middlewares/user_details.middleware";

import upload from "../middlewares/upload.middleware";

const router: IRouter = Router();

router.get("/", getUserDetails);
router.get("/:id", getUserDetailsById);
router.post(
  "/",
  upload.single("avatar"),
  /*validateCreateUserDetail,*/ createUserDetail,
);
router.put(
  "/:id",
  upload.single("avatar"),
  /*validateUpdateUserDetail,*/
  updateUserDetail,
);
router.delete("/:id", deleteUserDetail);

export default router;
