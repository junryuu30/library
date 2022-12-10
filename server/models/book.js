'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });

    }
  };
  book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    desc: DataTypes.TEXT,
    category: DataTypes.STRING,
    approve: DataTypes.STRING,
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};