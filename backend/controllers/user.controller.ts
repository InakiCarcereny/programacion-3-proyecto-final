import { Request, Response, NextFunction } from "express";
import { User, UserDetails } from "../models";
import bcrypt from "bcrypt";

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { companyId } = res.locals;
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
    const { companyId } = res.locals;
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

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { companyId } = res.locals;
    const { firstName, lastName, email, password, profileId } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: "El email ya está en uso." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      isActive: true,
      companyId,
      profileId,
    });

    await UserDetails.create({
      userId: user.id,
      firstName,
      lastName,
    });

    res.status(201).json({ message: "User created successfully", user });
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
    const { companyId } = res.locals;
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
    const { companyId } = res.locals;
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
