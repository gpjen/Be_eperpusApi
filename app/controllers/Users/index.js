const { users } = require("../../models");

// CREATE USER (REGISTER)

exports.registerUser = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;
  try {
    const data = await users.create({ name, email, phone, password, status });

    res.status(200).json({
      status: "success",
      message: "register user",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// READ USERS

exports.getUsers = async (req, res, next) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete", "password"],
      },
    });

    res.status(200).json({
      status: "success",
      message: data.length > 0 ? "get users" : "no data ",
      data,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// READ USERS BY ID

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await users.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete", "password"],
      },
    });

    res.status(200).json({
      status: "success",
      message: "Get One User",
      data: data || "no data",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
