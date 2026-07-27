import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  Category: {
    findAllCategories: vi.fn(),
    findCategoryById: vi.fn(),
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
  },
}));

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/category.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getCategories", () => {
  it("devuelve lista de categorías", async () => {
    const { Category } = await import("../../models");
    const fake = [{ id: 1, name: "Electrónica" }];
    vi.mocked(Category.findAllCategories).mockResolvedValue(fake);

    const req = {} as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await getCategories(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getCategoryById", () => {
  it("devuelve 404 si no existe", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.findCategoryById).mockResolvedValue(null);

    const req = { params: { id: "99" }, body: { companyId: 1 } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getCategoryById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Category not found" });
  });
});

describe("createCategory", () => {
  it("devuelve 201 con la categoría creada", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.createCategory).mockResolvedValue({
      id: 1,
      name: "Nueva",
    } as any);

    const req = { body: { name: "Nueva", companyId: 1 } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await createCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Nueva" }),
    );
  });
});

describe("updateCategory", () => {
  it("devuelve 200 con categoría actualizada", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.updateCategory).mockResolvedValue({
      id: 1,
      name: "Actualizada",
    } as any);

    const req = {
      params: { id: "1" },
      body: { name: "Actualizada", companyId: 1 },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateCategory(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Category updated successfully",
      }),
    );
  });

  it("devuelve 404 si no existe", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.updateCategory).mockResolvedValue(null);

    const req = {
      params: { id: "99" },
      body: { name: "X", companyId: 1 },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await updateCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Category not found" });
  });
});

describe("deleteCategory", () => {
  it("devuelve 200 si se elimina correctamente", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.deleteCategory).mockResolvedValue(true);

    const req = { params: { id: "1" }, body: { companyId: 1 } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await deleteCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Category deleted successfully",
    });
  });

  it("devuelve 404 si no existe", async () => {
    const { Category } = await import("../../models");
    vi.mocked(Category.deleteCategory).mockResolvedValue(false);

    const req = { params: { id: "99" }, body: { companyId: 1 } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await deleteCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Category not found" });
  });
});
