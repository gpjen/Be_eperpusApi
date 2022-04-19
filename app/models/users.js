"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.books, {
        as: "books",
        foreignKey: {
          name: "userId",
        },
      });

      users.hasMany(models.transactions, {
        as: "admin",
        foreignKey: {
          name: "idAdmin",
        },
      });

      users.hasMany(models.transactions, {
        as: "visitor",
        foreignKey: {
          name: "idVisitor",
        },
      });
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      status: DataTypes.ENUM("admin", "student", "teacher"),
      password: DataTypes.STRING,
      isDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
