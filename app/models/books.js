'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    desc: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};