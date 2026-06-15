import { DataTypes, Model, Optional, Op } from "sequelize";
import sequelize from "../lib/db/db.config";
import { Product as ProductAttributes } from "../types/product";

interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  "id" | "description" | "imageUrl"
> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  declare id: number;
  declare name: string;
  declare description?: string;
  declare price: number;
  declare stock: number;
  declare imageUrl?: string;
  declare categoryId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findAllProducts(
    search?: string,
    categoryId?: string,
  ): Promise<Product[]> {
    const { Category } = await import("./index");
    const where: Record<string, unknown> = {};

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    return Product.findAll({
      where,
      include: [{ model: Category, as: "category" }],
    });
  }

  static async findProductById(id: number): Promise<Product | null> {
    const { Category } = await import("./index");

    return Product.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
  }

  static async createProduct(
    data: ProductCreationAttributes,
  ): Promise<Product> {
    return Product.create(data);
  }

  static async updateProduct(
    id: number,
    data: Partial<ProductAttributes>,
  ): Promise<Product | null> {
    const product = await Product.findByPk(id);
    if (!product) return null;

    return product.update(data);
  }

  static async deleteProduct(id: number): Promise<boolean> {
    const product = await Product.findByPk(id);
    if (!product) return false;

    await product.destroy();

    return true;
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
    updatedAt: true,
  },
);

export default Product;
