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
      res.status(409).json({ error: "El email ya está en uso." });
      return;
    }

    const company = await Company.create({ name: companyName });

    const adminProfile = await Profile.findProfileByName("admin");
    if (!adminProfile) {
      res.status(500).json({ error: "Perfil de administrador no encontrado." });
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

    const userDetails = await UserDetails.create({
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

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        companyId: company.id,
        companyName: company.name,
        profileId: adminProfile.id,
        role: adminProfile.name,
        profile: {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          avatarUrl: userDetails.avatarUrl,
          phone: userDetails.phone,
        },
      },
    });
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
      res.status(401).json({ error: "Credenciales inválidas." });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({ error: "Usuario inactivo." });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: "Credenciales inválidas." });
      return;
    }

    const company = await Company.findByPk(user.companyId);
    const userDetails = await UserDetails.findOne({
      where: { userId: user.id },
    });
    const profile = await Profile.findByPk(user.profileId);

    const token = generateToken({
      userId: user.id,
      companyId: user.companyId,
      profileId: user.profileId,
    });

    await redis.set(`session:${token}`, user.id, "EX", 60 * 60 * 24 * 7);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        companyId: user.companyId,
        companyName: company?.name,
        profileId: user.profileId,
        role: profile?.name,
        profile: {
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          avatarUrl: userDetails?.avatarUrl,
          phone: userDetails?.phone,
        },
      },
    });
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
    res.json({ message: "Cierre de sesión exitoso." });
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
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}
