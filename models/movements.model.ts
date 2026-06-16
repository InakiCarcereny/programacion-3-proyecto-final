import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { Movement as MovementAttributes } from "../types/movements";

interface MovementCreationAttributes extends Optional<
  MovementAttributes,
  "id" | "description"
> {}

class Movement
  extends Model<MovementAttributes, MovementCreationAttributes>
  implements MovementAttributes
{
  declare id: number;
  declare productId: number;
  declare quantity: number;
  declare type: "ingreso" | "egreso";
  declare description?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findAllMovements(): Promise<Movement[]> {
    const { Product } = await import("./index");

    return await Movement.findAll({
      include: [{ model: Product, as: "product" }],
    });
  }

  static async findMovementById(id: number): Promise<Movement | null> {
    const { Product } = await import("./index");

    return await Movement.findByPk(id, {
      include: [{ model: Product, as: "product" }],
    });
  }

  static async createMovement(
    data: MovementCreationAttributes,
  ): Promise<Movement> {
    return await Movement.create(data);
  }
}

Movement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("ingreso", "egreso"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "movements",
    modelName: "Movement",
    timestamps: true,
    updatedAt: true,
  },
);

export default Movement;
