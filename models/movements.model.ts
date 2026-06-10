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
  // declare userId: number;
  declare quantity: number;
  declare type: "ingreso" | "egreso";
  declare description?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
    updatedAt: true,
  },
);

export default Movement;
