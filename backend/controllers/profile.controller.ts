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

export async function getProfileById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const profile = await Profile.findProfileById(id);
    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const profile = await Profile.createProfile(req.body);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const profile = await Profile.updateProfile(id, req.body);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    next(error);
  }
}

export async function deleteProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await Profile.deleteProfile(id);
    if (!deleted) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    next(error);
  }
}
