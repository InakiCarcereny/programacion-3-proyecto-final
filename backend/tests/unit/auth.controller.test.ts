import { describe, it, expect, vi } from "vitest";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/jwt.config";

vi.mock("../../models", () => ({
  User: {
    findByEmail: vi.fn(),
    create: vi.fn(),
    findUserById: vi.fn(),
  },
  Company: {
    create: vi.fn(),
    findByPk: vi.fn(),
  },
  Profile: {
    findProfileByName: vi.fn(),
    findByPk: vi.fn(),
  },
  UserDetails: {
    create: vi.fn(),
    findOne: vi.fn(),
  },
}));

vi.mock("../../lib/jwt.config", () => ({
  generateToken: vi.fn(),
}));

vi.mock("../../lib/redis.config", () => ({
  default: {
    set: vi.fn(),
    del: vi.fn(),
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

import { register, login, me } from "../../controllers/auth.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("register", () => {
  it("crea usuario y devuelve 201 con token", async () => {
    const { User, Company, Profile, UserDetails } =
      await import("../../models");

    vi.mocked(User.findByEmail).mockResolvedValue(null);
    vi.mocked(Company.create).mockResolvedValue({ id: 1, name: "Mi Empresa" });
    vi.mocked(Profile.findProfileByName).mockResolvedValue({
      id: 1,
      name: "admin",
    });
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as never);
    vi.mocked(User.create).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      companyId: 1,
      profileId: 1,
    });
    vi.mocked(UserDetails.create).mockResolvedValue({
      firstName: "Juan",
      lastName: "Pérez",
      avatarUrl: null,
      phone: null,
    });
    vi.mocked(generateToken).mockReturnValue("fake-jwt-token" as never);

    const req = {
      body: {
        firstName: "Juan",
        lastName: "Pérez",
        email: "test@test.com",
        password: "123456",
        companyName: "Mi Empresa",
      },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "fake-jwt-token",
        user: expect.objectContaining({ email: "test@test.com" }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 409 si el email ya existe", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.findByEmail).mockResolvedValue({ id: 1 } as any);

    const req = {
      body: { email: "test@test.com", password: "123" },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "El email ya está en uso.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("login", () => {
  it("devuelve 401 si el email no existe", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.findByEmail).mockResolvedValue(null);

    const req = {
      body: { email: "noexiste@test.com", password: "123" },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Credenciales inválidas.",
    });
  });
});

describe("me", () => {
  it("devuelve 404 si el usuario no existe", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.findUserById).mockResolvedValue(null);

    const req = { body: { userId: 999, companyId: 1 } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await me(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Usuario no encontrado.",
    });
  });
});
