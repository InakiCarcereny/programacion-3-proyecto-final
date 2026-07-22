import { Request, Response, NextFunction } from "express";
import { UserDetails } from "../models";

export async function getUserDetails(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userDetails = await UserDetails.findAllUserDetails();
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
}
export async function getUserDetailsById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const userDetails = await UserDetails.findAllUserDetailsById(id);
    if (!userDetails) {
      res.status(404).json({ error: "User Detail not found" });
      return;
    }
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
}

export async function createUserDetail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userDetail = await UserDetails.createUserDetail(req.body);
    res.status(201).json(userDetail);
  } catch (error) {
    next(error);
  }
}

export async function updateUserDetail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const userDetail = await UserDetails.updateUserDetail(id, req.body);
    if (!userDetail) {
      res.status(404).json({ error: "User Detail not found" });
      return;
    }
    res.json({ message: "User Detail updated successfully", userDetail });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserDetail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await UserDetails.deleteUserDetail(id);
    if (!deleted) {
      res.status(404).json({ error: "User Detail not found" });
      return;
    }
    res.status(200).json({ message: "User Detail deleted successfully" });
  } catch (error) {
    next(error);
  }
}
