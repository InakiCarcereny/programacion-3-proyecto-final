import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  UserDetails: {
    findDetailsByUserId: vi.fn(),
    updateDetails: vi.fn(),
  },
}));

vi.mock("../../utils/upload-image", () => ({
  uploadImage: vi.fn(),
}));

import {
  getDetailsByUserId,
  updateDetails,
} from "../../controllers/user-detail.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getDetailsByUserId", () => {
  it("devuelve detalles del usuario", async () => {
    const { UserDetails } = await import("../../models");
    const fake = { id: 1, userId: 1, firstName: "Juan", lastName: "Pérez" };
    vi.mocked(UserDetails.findDetailsByUserId).mockResolvedValue(fake);

    const req = { params: { userId: "1" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getDetailsByUserId(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 404 si no existen detalles", async () => {
    const { UserDetails } = await import("../../models");
    vi.mocked(UserDetails.findDetailsByUserId).mockResolvedValue(null);

    const req = { params: { userId: "99" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getDetailsByUserId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User details not found" });
  });
});

describe("updateDetails", () => {
  it("devuelve 200 con detalles actualizados", async () => {
    const { UserDetails } = await import("../../models");
    vi.mocked(UserDetails.updateDetails).mockResolvedValue({
      id: 1,
      firstName: "Actualizado",
    } as any);

    const req = {
      params: { userId: "1" },
      body: { firstName: "Actualizado" },
      file: null,
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateDetails(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User details updated successfully",
      }),
    );
  });

  it("devuelve 404 si no existen detalles", async () => {
    const { UserDetails } = await import("../../models");
    vi.mocked(UserDetails.updateDetails).mockResolvedValue(null);

    const req = {
      params: { userId: "99" },
      body: { firstName: "X" },
      file: null,
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateDetails(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User details not found" });
  });
});
