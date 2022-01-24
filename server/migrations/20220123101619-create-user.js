'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(30),
        validate: {
          isEmail: true
        }
      },
      nickname: {
        type: Sequelize.STRING(10)
      },
      password: {
        type: Sequelize.STRING
      },
      profile_img: {
        type: Sequelize.BLOB
      },
      status_msg: {
        type: Sequelize.STRING(20)
      },
      total_follow: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_follower: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};