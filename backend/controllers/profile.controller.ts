import { Request, Response, NextFunction } from "express";
import { Profile } from "../models";

export async function getProfiles(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const profiles = await Profile.findAllProfiles();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
}

export async function getProfileByName(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name } = req.params;
    const profile = await Profile.findProfileByName(name);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
}
