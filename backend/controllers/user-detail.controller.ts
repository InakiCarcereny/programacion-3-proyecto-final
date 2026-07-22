import { Request, Response, NextFunction } from "express";
import { UserDetails } from "../models";
import { uploadImage } from "../utils/upload-image";

export async function getDetailsByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = Number(req.params.userId);
    const userDetails = await UserDetails.findDetailsByUserId(userId);

    if (!userDetails) {
      res.status(404).json({ error: "User details not found" });
      return;
    }

    res.json(userDetails);
  } catch (error) {
    next(error);
  }
}

export async function updateDetails(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = Number(req.params.userId);
    let avatarUrl: string | undefined;

    if (req.file) {
      avatarUrl = await uploadImage(req.file.buffer, "avatar");
    }

    const updatedDetails = await UserDetails.updateDetails(userId, {
      ...req.body,
      ...(avatarUrl && { avatarUrl }),
    });

    if (!updatedDetails) {
      res.status(404).json({ error: "User details not found" });
      return;
    }

    res.json({
      message: "User details updated successfully",
      userDetails: updatedDetails,
    });
  } catch (error) {
    next(error);
  }
}
