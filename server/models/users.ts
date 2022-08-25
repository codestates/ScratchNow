import {
    DataTypes,
    Model,
} from 'sequelize';
import { sequelize } from './index';

interface UsersAttributes {
    id?: number;
    email: string,
    password: string,
    nickname: string,
    profile_image_url?: string,
    status_message?: string,
    deleted_yn?: string
};

export class Users extends Model<UsersAttributes> {
    private readonly id!: number;
    private email!: string;
    private password!: string;
    private nickname!: string;
    private profile_image_url!: string;
    private status_message!: string;
    private readonly deleted_yn!: string;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;
};

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nickname: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        profile_image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status_message: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        deleted_yn: {
            type: DataTypes.STRING(1),
            defaultValue: 'n',
            allowNull: false
        }
    },
    {
        modelName: 'Users',
        tableName: 'users',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);