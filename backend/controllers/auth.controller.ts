import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Company, Profile, User, UserDetails } from "../models";
import { generateToken } from "../lib/jwt.config";
import redis from "../lib/redis.config";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { firstName, lastName, email, password, companyName } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: "Email is already registered." });
      return;
    }

    const company = await Company.create({ name: companyName });

    const adminProfile = await Profile.findProfileByName("admin");
    if (!adminProfile) {
      res.status(500).json({ error: "Admin profile not found." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      isActive: true,
      companyId: company.id,
      profileId: adminProfile.id,
    });

    await UserDetails.create({
      userId: user.id,
      firstName,
      lastName,
    });

    const token = generateToken({
      userId: user.id,
      companyId: company.id,
      profileId: adminProfile.id,
    });

    await redis.set(`session:${token}`, user.id, "EX", 60 * 60 * 24 * 7);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({ error: "Inactive user." });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const token = generateToken({
      userId: user.id,
      companyId: user.companyId,
      profileId: user.profileId,
    });

    await redis.set(`session:${token}`, user.id, "EX", 60 * 60 * 24 * 7);

    res.json({ token });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      await redis.del(`session:${token}`);
    }

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { userId, companyId } = req.body;

    const user = await User.findUserById(userId, companyId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}
