import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const companyId = Number(req.query.companyId);

    if (!companyId) {
      res.status(400).json({ error: "companyId query parameter is required" });
      return;
    }

    const users = await User.findAllUsers(companyId);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const companyId = Number(req.query.companyId);

    if (!companyId) {
      res.status(400).json({ error: "companyId query parameter is required" });
      return;
    }

    const user = await User.findUserById(id, companyId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const companyId = Number(req.body.companyId || req.query.companyId);

    if (!companyId) {
      res.status(400).json({ error: "companyId is required" });
      return;
    }

    const user = await User.updateUser(id, companyId, req.body);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const companyId = Number(req.body.companyId || req.query.companyId);

    if (!companyId) {
      res.status(400).json({ error: "companyId is required" });
      return;
    }

    const deleted = await User.deleteUser(id, companyId);
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}
