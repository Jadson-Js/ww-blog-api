'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      ImageName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT(),
        allowNull: false
      },


      CategoryId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};