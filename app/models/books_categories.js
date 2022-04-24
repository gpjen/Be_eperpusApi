"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books_categories.init(
    {
      booksId: DataTypes.INTEGER,
      categoriesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "books_categories",
    }
  );
  return books_categories;
};
