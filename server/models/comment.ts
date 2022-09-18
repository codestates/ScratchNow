import {
  DataTypes,
  Model,
  Association,
  ForeignKey,
  CreationOptional,
} from 'sequelize';
import { sequelize } from './index';
import { User } from './user';
import { Post } from './post';

type CommentsAttributes = {
  id?: number;
  user_id?: number;
  post_id?: number;
  original_comment_id?: number;
  anonymity_yn?: string;
  text: string;
};

export class Comment extends Model<CommentsAttributes> {
  private declare readonly id: number;
  private declare user_id: ForeignKey<User['id']>;
  private declare post_id: ForeignKey<Post['id']>;
  private declare original_comment_id: ForeignKey<Comment['id']>;
  private declare anonymity_yn: string;
  private declare text: string;
  private declare readonly created_at: CreationOptional<Date>;
  private declare readonly updated_at: CreationOptional<Date>;
  private declare readonly deleted_at: CreationOptional<Date>;

  declare static associations: {
    userHasManyComments: Association<User, Comment>;
    postHasManyComments: Association<Post, Comment>;
    commentHasManyComments: Association<Comment, Comment>;
  };
}

Comment.init(
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
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Post,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    original_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    anonymity_yn: {
      type: DataTypes.STRING(1),
      defaultValue: 'n',
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    modelName: 'Comment',
    tableName: 'comment',
    sequelize,
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

User.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyComments',
});

Comment.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'userHasManyComments',
});

Post.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'post_id',
  as: 'postHasManyComments',
});

Comment.belongsTo(Post, {
  targetKey: 'id',
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  hooks: true,
  as: 'postHasManyComments',
});

Comment.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'original_comment_id',
  as: 'commentHasManyComments',
});
