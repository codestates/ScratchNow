import {
  DataTypes,
  Model,
  Association,
  ForeignKey,
  CreationOptional,
} from 'sequelize';
import { sequelize } from './index';
import { User } from './user';

type PostsAttributes = {
  id?: number;
  painting_url?: string;
  text?: string;
  user_id?: number;
  total_likes?: number;
};

export class Post extends Model<PostsAttributes> {
  private declare id: number;
  private declare painting_url: string;
  private declare text: string;
  private declare user_id: ForeignKey<User['id']>;
  private declare total_likes: number;
  private declare readonly created_at: CreationOptional<Date>;
  private declare readonly updated_at: CreationOptional<Date>;
  private declare readonly deleted_at: CreationOptional<Date>;

  declare static associations: {
    userHasManyPosts: Association<User, Post>;
  };
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    painting_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    total_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    modelName: 'Post',
    tableName: 'post',
    sequelize,
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyPosts',
});

Post.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
  as: 'userHasManyPosts',
});
