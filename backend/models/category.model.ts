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
  declare id: number;
  declare name: string;
  declare description?: string;
  declare companyId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findAllCategories(companyId: number): Promise<Category[]> {
    return await Category.findAll({ where: { companyId } });
  }

  static async findCategoryById(
    id: number,
    companyId: number,
  ): Promise<Category | null> {
    return await Category.findOne({ where: { id, companyId } });
  }

  static async createCategory(
    data: CategoryCreationAttributes,
  ): Promise<Category> {
    return await Category.create(data);
  }

  static async updateCategory(
    id: number,
    companyId: number,
    data: Partial<CategoryAttributes>,
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id, companyId } });
    if (!category) return null;

    return await category.update(data);
  }

  static async deleteCategory(id: number, companyId: number): Promise<boolean> {
    const category = await Category.findOne({ where: { id, companyId } });
    if (!category) return false;

    await category.destroy();

    return true;
  }
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
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "companies", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize,
    tableName: "categories",
    modelName: "Category",
    timestamps: true,
    updatedAt: true,
  },
);

export default Category;
