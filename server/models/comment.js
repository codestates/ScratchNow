'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(
        models.user,{
          targetKey: 'id',
          foreignKey: 'user_id'
        }
      )
      comment.belongsTo(
        models.post,{
          targetKey: 'id',
          foreignKey: 'post_id'
        }
      )
    }
  }
  comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};