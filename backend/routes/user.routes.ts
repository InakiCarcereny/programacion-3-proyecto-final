import { Router, IRouter } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateUpdateUser } from "../middlewares/user.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, validateUpdateUser, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
