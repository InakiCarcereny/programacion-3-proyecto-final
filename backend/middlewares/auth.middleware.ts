import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.config";
import redis from "../lib/redis.config";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No Token" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const exists = await redis.get(`session:${token}`);
    if (!exists) {
      res.status(401).json({ error: "Invalid session" });
      return;
    }

    const payload = verifyToken(token);
    req.body.userId = payload.userId;
    req.body.companyId = payload.companyId;
    req.body.profileId = payload.profileId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
