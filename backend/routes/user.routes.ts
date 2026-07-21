import { Router, IRouter } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

// import {
//   validateCreateUser,
//   validateUpdateUser,
// } from "../middlewares/user.middleware";

const router: IRouter = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", /*validateCreateUser,*/ createUser);
router.put("/:id", /*validateUpdateUser,*/ updateUser);
router.delete("/:id", deleteUser);

export default router;
