import {
    Sequelize,
    DataTypes,
    Model,
    Association
} from 'sequelize';
import { sequelize } from './index';

interface LikesAttributes {
    id: number;
    user_id: number,
    post_id: number,
    deleted_yn: string
}

export class Likes extends Model<LikesAttributes> {
    private readonly id! : number;
    private user_id! : number;
    private post_id! : number;
    private deleted_yn!: string;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;

    static associations: {

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

// Posts.hasMany()