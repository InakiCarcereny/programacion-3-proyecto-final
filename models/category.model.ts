import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { Category as CategoryAttributes } from "../types/category";

interface CategoryCreationAttributes extends Optional<
  CategoryAttributes,
  "id" | "description"
> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "categories",
    modelName: "Category",
  },
);

export default Category;
