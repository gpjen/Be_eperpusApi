const { users } = require("../../models");

exports.getUsers = async (req, res, next) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete"],
      },
    });

    res.status(200).json({
      status: data ? "success" : "failed",
      data: data || "No data",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {};
