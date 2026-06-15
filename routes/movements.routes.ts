import { Router, IRouter } from "express";
import {
  getMovements,
  getMovementById,
  createMovement,
} from "../controllers/movements.controller";

const router: IRouter = Router();

router.get("/", getMovements);
router.get("/:id", getMovementById);
router.post("/", createMovement);

export default router;
