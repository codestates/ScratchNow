import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

type UsersAttributes = {
  id?: number;
  sign_type?: number;
  email?: string;
  password?: string;
  nickname?: string;
  profile_image_url?: string;
  status_message?: string;
};

export class User extends Model<UsersAttributes> {
  private declare readonly id: number;
  private declare sign_type: number;
  private declare email: string;
  private declare password: string;
  private declare nickname: string;
  private declare profile_image_url: string;
  private declare status_message: string;
  private declare readonly created_at: CreationOptional<Date>;
  private declare readonly updated_at: CreationOptional<Date>;
  private declare readonly deleted_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sign_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    profile_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_message: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    modelName: 'User',
    tableName: 'user',
    sequelize,
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
