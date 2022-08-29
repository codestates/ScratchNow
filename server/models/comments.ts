import {
    DataTypes,
    Model,
    Association, ForeignKey
} from 'sequelize';
import { sequelize } from './index';
import {Users} from "./users";
import {Posts} from "./posts";

interface CommentsAttributes {
    id?: number;
    user_id: number,
    post_id: number,
    original_comment_id?: number,
    anonymity_yn: string,
    text: string
};

export class Comments extends Model<CommentsAttributes> {
    private readonly id?: number;
    private user_id!: ForeignKey<Users['id']>;
    private post_id!: ForeignKey<Posts['id']>;
    private original_comment_id?: ForeignKey<Comments['id']>;
    private anonymity_yn?: string;
    private text!: string;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;
    private readonly deleted_at!: Date;

    static associations: {
        userHasManyComments: Association<Users, Comments>;
        postHasManyComments: Association<Posts, Comments>;
        commentHasManyComments: Association<Comments, Comments>;
    }
};

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        original_comment_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        anonymity_yn: {
            type: DataTypes.STRING(1),
            defaultValue: 'n',
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        modelName: 'Comments',
        tableName: 'comments',
        sequelize,
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
);

Users.hasMany(Comments, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'userHasManyComments'
});

Comments.belongsTo(Users, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'userHasManyComments'
});

Posts.hasMany(Comments, {
    sourceKey: 'id',
    foreignKey: 'post_id',
    as: 'postHasManyComments'
});

Comments.belongsTo(Posts, {
    targetKey: 'id',
    foreignKey: 'post_id',
    as: 'postHasManyComments'
});

Comments.belongsTo(Comments, {
    targetKey: 'id',
    foreignKey: 'original_comment_id',
    as: 'commentHasManyComments'
});