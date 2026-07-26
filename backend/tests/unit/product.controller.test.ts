import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  Product: {
    findAllProducts: vi.fn(),
    findProductById: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
  },
}));

vi.mock("../utils/upload-image", () => ({
  uploadImage: vi.fn(),
}));

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../../controllers/product.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getProducts", () => {
  it("devuelve lista de productos", async () => {
    const { Product } = await import("../../models");
    const fakeProducts = [{ id: 1, name: "Producto A" }];
    vi.mocked(Product.findAllProducts).mockResolvedValue(fakeProducts);

    const req = { query: {}, res: { locals: { companyId: 1 } } } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await getProducts(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeProducts);
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve error si findAllProducts falla", async () => {
    const { Product } = await import("../../models");
    const error = new Error("DB error");
    vi.mocked(Product.findAllProducts).mockRejectedValue(error);

    const req = { query: {}, res: { locals: { companyId: 1 } } } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await getProducts(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("getProductById", () => {
  it("devuelve 404 si no existe", async () => {
    const { Product } = await import("../../models");
    vi.mocked(Product.findProductById).mockResolvedValue(null);

    const req = {
      params: { id: "99" },
      body: {},
      res: { locals: { companyId: 1 } },
    } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await getProductById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });
});

describe("createProduct", () => {
  it("devuelve 201 con el producto creado", async () => {
    const { Product } = await import("../../models");
    vi.mocked(Product.createProduct).mockResolvedValue({
      id: 1,
      name: "Nuevo",
    } as any);

    const req = { body: { name: "Nuevo" }, file: null } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await createProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Nuevo" }),
    );
  });
});

describe("deleteProduct", () => {
  it("devuelve 200 si se elimina correctamente", async () => {
    const { Product } = await import("../../models");
    vi.mocked(Product.deleteProduct).mockResolvedValue(true);

    const req = {
      params: { id: "1" },
      body: {},
      res: { locals: { companyId: 1 } },
    } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await deleteProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product deleted successfully",
    });
  });

  it("devuelve 404 si el producto no existe", async () => {
    const { Product } = await import("../../models");
    vi.mocked(Product.deleteProduct).mockResolvedValue(false);

    const req = {
      params: { id: "99" },
      body: {},
      res: { locals: { companyId: 1 } },
    } as any;
    const res = getMockRes();
    res.locals = { companyId: 1 };
    const next = vi.fn();

    await deleteProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });
});
