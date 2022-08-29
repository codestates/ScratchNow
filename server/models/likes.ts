import {
    DataTypes,
    Model,
    Association, ForeignKey
} from 'sequelize';
import { sequelize } from './index';
import {Posts} from "./posts";
import {Users} from "./users";

interface LikesAttributes {
    id?: number;
    user_id: number,
    post_id: number
};

export class Likes extends Model<LikesAttributes> {
    private readonly id!: number;
    private user_id!: ForeignKey<Users['id']>;
    private post_id!: ForeignKey<Posts['id']>;
    private readonly created_at!: Date;
    private readonly updated_at!: Date;
    private readonly deleted_at!: Date;

    static associations: {
        userHasManyLikes: Association<Users, Likes>;
        postHasManyLikes: Association<Posts, Likes>;
    }
};

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
        }
    },
    {
        modelName: 'Likes',
        tableName: 'likes',
        sequelize,
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
);

Users.hasMany(Likes, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'userHasManyLikes'
});

Likes.belongsTo(Users, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'userHasManyLikes'
});

Posts.hasMany(Likes, {
    sourceKey: 'id',
    foreignKey: 'post_id',
    as: 'postHasManyLikes'
});

Likes.belongsTo(Posts, {
    targetKey: 'id',
    foreignKey: 'post_id',
    as: 'postHasManyLikes'
});