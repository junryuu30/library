'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      approve: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      // idUser: {
      //   type: Sequelize.INTEGER
      // },
      idUser:{
        type: Sequelize.INTEGER,
        references: {
          model:"users",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('books');
  }
};