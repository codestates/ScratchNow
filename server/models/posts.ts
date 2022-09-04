import { DataTypes, Model, Association, ForeignKey } from 'sequelize';
import { sequelize } from './index';
import { Users } from './users';

interface PostsAttributes {
  id?: number;
  painting_url: string;
  text?: string;
  user_id: number;
  total_likes?: number;
}

export class Posts extends Model<PostsAttributes> {
  private readonly id!: number;
  private painting_url!: string;
  private text!: string;
  private user_id!: ForeignKey<Users['id']>;
  private total_likes!: number;
  private readonly created_at!: Date;
  private readonly updated_at!: Date;
  private readonly deleted_at!: Date;

  static associations: {
    userHasManyPosts: Association<Users, Posts>;
  };
}

Posts.init(
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
    },
    total_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    modelName: 'Posts',
    tableName: 'posts',
    sequelize,
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

Users.hasMany(Posts, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyPosts',
});

Posts.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyPosts',
});
