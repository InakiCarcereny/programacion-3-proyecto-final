import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { UserDetails as UserDetailsAttributes } from "../types/user-details";

interface UserDetailsCreationAttributes extends Optional<
  UserDetailsAttributes,
  "id" | "avatarUrl" | "phone"
> {}

class UserDetails
  extends Model<UserDetailsAttributes, UserDetailsCreationAttributes>
  implements UserDetailsAttributes
{
  declare id: number;
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare avatarUrl?: string;
  declare phone?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findDetailsByUserId(
    userId: number,
  ): Promise<UserDetails | null> {
    return await UserDetails.findOne({ where: { userId } });
  }

  static async updateDetails(
    userId: number,
    data: Partial<UserDetailsAttributes>,
  ): Promise<UserDetails | null> {
    const details = await UserDetails.findOne({ where: { userId } });
    if (!details) return null;
    return await details.update(data);
  }
}

UserDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_details",
    modelName: "UserDetails",
    timestamps: true,
  },
);

export default UserDetails;
