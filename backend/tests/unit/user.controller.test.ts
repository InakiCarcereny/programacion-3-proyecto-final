import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  User: {
    findAllUsers: vi.fn(),
    findUserById: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  },
}));

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getUsers", () => {
  it("devuelve 400 si falta companyId", async () => {
    const req = { query: {} } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "companyId query parameter is required",
    });
  });

  it("devuelve lista de usuarios", async () => {
    const { User } = await import("../../models");
    const fake = [{ id: 1, email: "admin@test.com" }];
    vi.mocked(User.findAllUsers).mockResolvedValue(fake);

    const req = { query: { companyId: "1" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getUsers(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getUserById", () => {
  it("devuelve 400 si falta companyId", async () => {
    const req = { params: { id: "1" }, query: {} } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("devuelve 404 si no existe", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.findUserById).mockResolvedValue(null);

    const req = { params: { id: "99" }, query: { companyId: "1" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});

describe("updateUser", () => {
  it("devuelve 200 con usuario actualizado", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.updateUser).mockResolvedValue({
      id: 1,
      email: "actualizado@test.com",
    } as any);

    const req = {
      params: { id: "1" },
      body: { email: "actualizado@test.com" },
      res: { locals: { companyId: 1 } },
    } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await updateUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User updated successfully" }),
    );
  });

  it("devuelve 404 si no existe", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.updateUser).mockResolvedValue(null);

    const req = {
      params: { id: "99" },
      body: { email: "test@test.com" },
      res: { locals: { companyId: 1 } },
    } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await updateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});

describe("deleteUser", () => {
  it("devuelve 200 si se elimina correctamente", async () => {
    const { User } = await import("../../models");
    vi.mocked(User.deleteUser).mockResolvedValue(true);

    const req = {
      params: { id: "1" },
      body: { companyId: 1 },
      query: {},
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await deleteUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });
});
