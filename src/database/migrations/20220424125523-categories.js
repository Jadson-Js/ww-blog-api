// 'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories',{ 
     id: {
       type: Sequelize.INTEGER,
       unique: true,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
     },
     title: {
       type: Sequelize.STRING(32),
       unique: true,
       allowNull: false,
     },
     updatedAt: Sequelize.DATE,
     createdAt: Sequelize.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categories');
  }
};