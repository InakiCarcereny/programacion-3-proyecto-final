import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { Company as CompanyAttributes } from "../types/company";

interface CompanyCreationAttributes extends Optional<
  CompanyAttributes,
  "id" | "description" | "logoUrl"
> {}

class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  declare id: number;
  declare name: string;
  declare description?: string;
  declare logoUrl?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findCompanyById(id: number): Promise<Company | null> {
    return await Company.findByPk(id);
  }

  static async updateCompany(
    id: number,
    data: Partial<CompanyAttributes>,
  ): Promise<Company | null> {
    const company = await Company.findByPk(id);
    if (!company) return null;
    return await company.update(data);
  }
}

Company.init(
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
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "companies",
    modelName: "Company",
    timestamps: true,
  },
);

export default Company;
