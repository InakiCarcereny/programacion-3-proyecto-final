import { Router, IRouter } from "express";

import {
  getMovements,
  getMovementById,
  createMovement,
} from "../controllers/movements.controller";

import { validateMovement } from "../middlewares/movements.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router: IRouter = Router();

router.get("/", authenticate, getMovements);
router.get("/:id", authenticate, getMovementById);
router.post("/", authenticate, validateMovement, createMovement);

export default router;
