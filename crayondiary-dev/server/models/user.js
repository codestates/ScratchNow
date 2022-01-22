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
    }
  }
  user.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_img: DataTypes.BLOB,
    status_message: DataTypes.STRING,
    total_follow: DataTypes.INTEGER,
    total_follower: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};