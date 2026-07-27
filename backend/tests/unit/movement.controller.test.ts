import { describe, it, expect, vi } from "vitest";

vi.mock("../../models", () => ({
  Movement: {
    findAllMovements: vi.fn(),
    findMovementById: vi.fn(),
    createMovement: vi.fn(),
  },
}));

import {
  getMovements,
  getMovementById,
  createMovement,
} from "../../controllers/movements.controller";

function getMockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("getMovements", () => {
  it("devuelve lista de movimientos", async () => {
    const { Movement } = await import("../../models");
    const fake = [{ id: 1, type: "ingreso", quantity: 10 }];
    vi.mocked(Movement.findAllMovements).mockResolvedValue(fake);

    const req = {} as any;
    const res = getMockRes();
    const next = vi.fn();

    await getMovements(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fake);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getMovementById", () => {
  it("devuelve 404 si no existe", async () => {
    const { Movement } = await import("../../models");
    vi.mocked(Movement.findMovementById).mockResolvedValue(null);

    const req = { params: { id: "99" } } as any;
    const res = getMockRes();
    const next = vi.fn();

    await getMovementById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Movement not found" });
  });
});

describe("createMovement", () => {
  it("devuelve 201 con el movimiento creado", async () => {
    const { Movement } = await import("../../models");
    vi.mocked(Movement.createMovement).mockResolvedValue({
      id: 1,
      productId: 1,
      quantity: 5,
      type: "ingreso",
    } as any);

    const req = {
      body: { productId: 1, quantity: 5, type: "ingreso" },
    } as any;
    const res = getMockRes();
    const next = vi.fn();

    await createMovement(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, productId: 1 }),
    );
  });
});
