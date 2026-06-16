import { Request, Response, NextFunction } from "express";
import Movement from "../models/movements.model";

export async function getMovements(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const movements = await Movement.findAll();
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
    const movement = await Movement.findByPk(id);

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
    const movement = await Movement.create(req.body);
    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
}
