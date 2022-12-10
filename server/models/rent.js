'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rent.belongsTo(models.book,{
        as: "book",
        foreignKey: {
          name: "idBook",
        },
      });
      rent.belongsTo(models.user, {
        as: "user",
        foreignKey:{
          name: "idUser",
        }
      });
    }
  };
  rent.init({
    idbook: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER,
    return_date: DataTypes.STRING,
    actual_return_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rent',
  });
  return rent;
};