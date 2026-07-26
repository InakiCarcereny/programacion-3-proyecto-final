import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  Company: {
    findCompanyById: vi.fn(),
    updateCompany: vi.fn(),
  },
}));

vi.mock("../../utils/upload-image", () => ({
  uploadImage: vi.fn(),
}));

import {
  getCompanyById,
  updateCompany,
} from "../../controllers/company.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getCompanyById", () => {
  it("devuelve compañía por id", async () => {
    const { Company } = await import("../../models");
    const fake = { id: 1, name: "Inventory Pro" };
    vi.mocked(Company.findCompanyById).mockResolvedValue(fake);

    const req = { params: { id: "1" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getCompanyById(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 404 si no existe", async () => {
    const { Company } = await import("../../models");
    vi.mocked(Company.findCompanyById).mockResolvedValue(null);

    const req = { params: { id: "99" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getCompanyById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Company not found" });
  });
});

describe("updateCompany", () => {
  it("devuelve 200 con compañía actualizada", async () => {
    const { Company } = await import("../../models");
    vi.mocked(Company.updateCompany).mockResolvedValue({
      id: 1,
      name: "Actualizada",
    } as any);

    const req = {
      params: { id: "1" },
      body: { name: "Actualizada" },
      file: null,
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateCompany(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Company updated successfully" }),
    );
  });

  it("devuelve 404 si no existe", async () => {
    const { Company } = await import("../../models");
    vi.mocked(Company.updateCompany).mockResolvedValue(null);

    const req = {
      params: { id: "99" },
      body: { name: "X" },
      file: null,
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateCompany(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Company not found" });
  });
});
