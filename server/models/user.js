'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(
        models.post,{
          sourceKey: 'id',
          foreignKey: 'user_id'
        }
      )
      user.hasMany(
        models.comment,{
          sourceKey: 'id',
          foreignKey: 'user_id'
        }
      )
      user.hasMany(
        models.follow,{
          sourceKey: 'id',
          foreignKey: 'user_id'
        }
      )
      user.hasMany(
        models.follow,{
          sourceKey: 'id',
          foreignKey: 'follower_id'
        }
      )
    }
  }
  user.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_img: DataTypes.BLOB,
    status_msg: DataTypes.STRING,
    total_follow: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_follower: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};