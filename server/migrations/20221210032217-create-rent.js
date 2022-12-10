'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idbook: {
        type: Sequelize.INTEGER,
        references: {
          model:"books",
          key:"id",
        },
        onUpdate:"CASCADE",
        onDelete: "CASCADE",
      },
      iduser: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      },
      return_date: {
        type: Sequelize.STRING
      },
      actual_return_date: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rents');
  }
};