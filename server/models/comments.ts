import {
    Sequelize,
    DataTypes,
    Model,
    Association, ForeignKey
} from 'sequelize';
import { sequelize } from './index';
import {Users} from "./users";
import {Posts} from "./posts";
import {Likes} from "./likes";

interface CommentsAttributes {
    id: number;
    user_id: number,
    post_id: number,
    original_comment_id: number,
    anonymity_yn: string,
    text: string,
    deleted_yn: string
}

export class Comments extends Model<CommentsAttributes> {
    private readonly id!: number;
    private user_id!: ForeignKey<Users['id']>;
    private post_id!: ForeignKey<Posts['id']>;
    private original_comment_id!: ForeignKey<Comments['id']>;
    private anonymity_yn!: string;
    private text!: string;
    private deleted_yn!: string;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;

    static associations: {
        commentBelongsToUsers: Association<Comments, Users>;
        commentBelongsToPosts: Association<Comments, Posts>;
    }
}

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
        },
        deleted_yn: {
            type: DataTypes.STRING(1),
            defaultValue: 'n',
            allowNull: false
        }
    },
    {
        modelName: 'Comments',
        tableName: 'comments',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

Comments.belongsTo(Users, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'commentBelongsToUsers'
})

Comments.belongsTo(Posts, {
    targetKey: 'id',
    foreignKey: 'post_id',
    as: 'commentBelongsToPosts'
})