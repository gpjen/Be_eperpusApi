"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init(
    {
      idAdmin: DataTypes.INTEGER,
      idStudent: DataTypes.INTEGER,
      idBooks: DataTypes.INTEGER,
      estimation: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
