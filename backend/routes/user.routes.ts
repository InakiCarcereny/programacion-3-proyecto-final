import { Router, IRouter } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
