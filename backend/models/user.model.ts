import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { User as UserAttributes } from "../types/user";

interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "isActive"
> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare email: string;
  declare password: string;
  declare isActive: boolean;
  declare companyId: number;
  declare profileId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  static async findAllUsers(companyId: number): Promise<User[]> {
    const { UserDetails, Profile } = await import("./index");
    return await User.findAll({
      where: { companyId },
      include: [
        { model: UserDetails, as: "details" },
        { model: Profile, as: "profile" },
      ],
      attributes: { exclude: ["password"] },
    });
  }

  static async findUserById(
    id: number,
    companyId: number,
  ): Promise<User | null> {
    const { UserDetails, Profile } = await import("./index");
    return await User.findOne({
      where: { id, companyId },
      include: [
        { model: UserDetails, as: "details" },
        { model: Profile, as: "profile" },
      ],
      attributes: { exclude: ["password"] },
    });
  }

  static async updateUser(
    id: number,
    companyId: number,
    data: Partial<UserAttributes>,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { id, companyId } });
    if (!user) return null;
    return await user.update(data);
  }

  static async deleteUser(id: number, companyId: number): Promise<boolean> {
    const user = await User.findOne({ where: { id, companyId } });
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "companies", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "profiles", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  },
);

export default User;
