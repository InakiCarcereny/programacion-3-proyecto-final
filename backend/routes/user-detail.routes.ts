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

const router: IRouter = Router();

router.get("/", getUserDetails);
router.get("/:id", getUserDetailsById);
router.post("/", /*validateCreateUserDetail,*/ createUserDetail);
router.put("/:id", /*validateUpdateUserDetail,*/ updateUserDetail);
router.delete("/:id", deleteUserDetail);

export default router;
