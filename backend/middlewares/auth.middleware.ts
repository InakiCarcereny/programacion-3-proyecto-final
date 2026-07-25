import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.config";

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

    const payload = verifyToken(token);

    if (!req.body) req.body = {};
    req.body.userId = payload.userId;
    req.body.companyId = payload.companyId;
    req.body.profileId = payload.profileId;
    res.locals.userId = payload.userId;
    res.locals.companyId = payload.companyId;
    res.locals.profileId = payload.profileId;
    next();
  } catch (error) {
    console.log("AUTH ERROR:", (error as Error).message);
    res.status(401).json({ error: "Invalid token" });
  }
}
