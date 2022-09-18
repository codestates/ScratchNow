import {
  DataTypes,
  Model,
  Association,
  ForeignKey,
  CreationOptional,
} from 'sequelize';
import { sequelize } from './index';
import { Post } from './post';
import { User } from './user';

type LikesAttributes = {
  id?: number;
  user_id: number;
  post_id: number;
};

export class Liking extends Model<LikesAttributes> {
  private declare readonly id: number;
  private declare user_id: ForeignKey<User['id']>;
  private declare post_id: ForeignKey<Post['id']>;
  private declare readonly created_at: CreationOptional<Date>;
  private declare readonly updated_at: CreationOptional<Date>;

  declare static associations: {
    userHasManyLikes: Association<User, Liking>;
    postHasManyLikes: Association<Post, Liking>;
  };
}

Liking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    modelName: 'Liking',
    tableName: 'liking',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

User.hasMany(Liking, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyLikes',
});

Liking.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
  as: 'userHasManyLikes',
});

Post.hasMany(Liking, {
  sourceKey: 'id',
  foreignKey: 'post_id',
  as: 'postHasManyLikes',
});

Liking.belongsTo(Post, {
  targetKey: 'id',
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  hooks: true,
  as: 'postHasManyLikes',
});
