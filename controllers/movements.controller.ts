import { Request, Response, NextFunction } from "express";
import { Movement } from "../models";

export async function getMovements(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const movements = await Movement.findAllMovements();

    res.json(movements);
  } catch (error) {
    next(error);
  }
}

export async function getMovementById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const movement = await Movement.findMovementById(id);
    if (!movement) {
      res.status(404).json({ error: "Movement not found" });
      return;
    }

    res.json(movement);
  } catch (error) {
    next(error);
  }
}

export async function createMovement(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const movement = await Movement.createMovement(req.body);

    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
}
