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
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findAllCategories(): Promise<Category[]> {
    return Category.findAll();
  }

  static async findCategoryById(id: number): Promise<Category | null> {
    return Category.findByPk(id);
  }

  static async createCategory(
    data: CategoryCreationAttributes,
  ): Promise<Category> {
    return Category.create(data);
  }

  static async updateCategory(
    id: number,
    data: Partial<CategoryAttributes>,
  ): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (!category) return null;

    return category.update(data);
  }

  static async deleteCategory(id: number): Promise<boolean> {
    const category = await Category.findByPk(id);
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
