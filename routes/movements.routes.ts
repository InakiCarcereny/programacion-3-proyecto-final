import { Router, IRouter } from "express";

import {
  getMovements,
  getMovementById,
  createMovement,
} from "../controllers/movements.controller";

import { validateMovement } from "../middlewares/movements.middleware";

const router: IRouter = Router();

router.get("/", getMovements);
router.get("/:id", getMovementById);
router.post("/", validateMovement, createMovement);

export default router;
