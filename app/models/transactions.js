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
      transactions.belongsTo(models.users, {
        as: "admin",
        foreignKey: {
          name: "id",
        },
      });
      transactions.belongsTo(models.users, {
        as: "visitor",
        foreignKey: {
          name: "id",
        },
      });
    }
  }
  transactions.init(
    {
      idAdmin: DataTypes.INTEGER,
      idVisitor: DataTypes.INTEGER,
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
