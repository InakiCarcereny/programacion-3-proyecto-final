import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db.config";
import { Movement as MovementAttributes } from "../types/movements";

interface MovementCreationAttributes extends Optional<
  MovementAttributes,
  "id" | "description"
> {}

class Movement
  extends Model<MovementAttributes, MovementCreationAttributes>
  implements MovementAttributes
{
  public id!: number;
  public productId!: number;
  // public userId!: number;
  public quantity!: number;
  public type!: "ingreso" | "egreso";
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    /* 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    */
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
    updatedAt: false, // No necesario, log no se actualiza.
  },
);

export default Movement;
