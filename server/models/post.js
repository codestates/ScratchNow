'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(
        models.user,{
          targetKey: 'id',
          foreignKey: 'user_id'
        }
      )
      post.hasMany(
        models.comment,{
          sourceKey: 'id',
          foreignKey: 'post_id'
        }
      )
      post.hasMany(
        models.like,{
          sourceKey: 'id',
          foreignKey: 'post_id'
        }
      )
    }
  }
  post.init({
    painting: DataTypes.BLOB,
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    total_likes: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};