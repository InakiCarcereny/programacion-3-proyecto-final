import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db/db.config";
import { Profile as ProfileAttributes } from "../types/profile";

interface ProfileCreationAttributes extends Optional<
  ProfileAttributes,
  "id" | "description"
> {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  declare id: number;
  declare name: string;
  declare description?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static async findAllProfiles(): Promise<Profile[]> {
    return await Profile.findAll();
  }

  static async findProfileByName(name: string): Promise<Profile | null> {
    return await Profile.findOne({ where: { name } });
  }
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "profiles",
    modelName: "Profile",
    timestamps: true,
  },
);

export default Profile;
