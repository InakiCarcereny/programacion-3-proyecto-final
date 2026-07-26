import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  Profile: {
    findAllProfiles: vi.fn(),
    findProfileByName: vi.fn(),
  },
}));

import {
  getProfiles,
  getProfileByName,
} from "../../controllers/profile.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getProfiles", () => {
  it("devuelve lista de perfiles", async () => {
    const { Profile } = await import("../../models");
    const fake = [
      { id: 1, name: "admin", description: "Administrador" },
      { id: 2, name: "empleado", description: "Empleado" },
    ];
    vi.mocked(Profile.findAllProfiles).mockResolvedValue(fake);

    const req = {} as any;
    const res = getMockRes();
    const next = vi.fn();

    await getProfiles(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getProfileByName", () => {
  it("devuelve perfil por nombre", async () => {
    const { Profile } = await import("../../models");
    const fake = { id: 1, name: "admin", description: "Administrador" };
    vi.mocked(Profile.findProfileByName).mockResolvedValue(fake);

    const req = { params: { name: "admin" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getProfileByName(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 404 si no existe", async () => {
    const { Profile } = await import("../../models");
    vi.mocked(Profile.findProfileByName).mockResolvedValue(null);

    const req = { params: { name: "inexistente" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getProfileByName(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Profile not found" });
  });
});
