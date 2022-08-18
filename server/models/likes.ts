import {
    Sequelize,
    DataTypes,
    Model,
    Association, ForeignKey
} from 'sequelize';
import { sequelize } from './index';
import {Posts} from "./posts";
import {Users} from "./users";

interface LikesAttributes {
    id: number;
    user_id: number,
    post_id: number,
    deleted_yn: string
}

export class Likes extends Model<LikesAttributes> {
    private readonly id! : number;
    private user_id! : ForeignKey<Users['id']>;
    private post_id! : ForeignKey<Posts['id']>;
    private deleted_yn!: string;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;

    static associations: {
        likeBelongsToUsers: Association<Likes, Users>;
        likeBelongsToPosts: Association<Likes, Posts>;
    }
}

Likes.init(
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
        deleted_yn: {
            type: DataTypes.STRING(1),
            defaultValue: 'n',
            allowNull: false
        }
    },
    {
        modelName: 'Likes',
        tableName: 'likes',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

Likes.belongsTo(Users, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'likeBelongsToUsers'
})

Likes.belongsTo(Posts, {
    targetKey: 'id',
    foreignKey: 'post_id',
    as: 'likeBelongsToPosts'
})