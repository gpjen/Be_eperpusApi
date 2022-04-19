const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { users } = require("../../models");

// CREATE USER (REGISTER)

exports.registerUser = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = await users.create({
      name,
      email,
      phone,
      password: hashedPassword,
      status,
    });

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

// USER LOGIN

exports.loginUser = async (req, res, next) => {
  const { emailOrPhone, password } = req.body;
  try {
    // find user email or phone
    const user = await users.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete"],
      },
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        [Op.and]: [{ isDelete: false }],
      },
    });

    // verify user password
    const passCompare = await bcrypt.compare(password, user.password);

    if (!user || !passCompare)
      return res.status(400).json({
        staus: "failed",
        message: "email and password desnt match",
      });

    // web token
    const dataPayload = { id: user.id, status: user.status };
    const token = jwt.sign(dataPayload, process.env.APP_SECRET_KEY);

    res.status(200).json({
      status: "success",
      message: "user login",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// READ USERS ACTIVE
exports.getUsersAll = async (req, res, next) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete", "password"],
      },
      where: { isDelete: false },
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

// UPDATES DATA BY ID
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, password, status } = req.body;
  try {
    const dataUpdate = await users.update(
      { name, email, phone, password, status },
      { where: { id } }
    );

    res.status(201).json({
      status: "success",
      message: "updte user data",
      data: dataUpdate,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// SOFT - DELETE USER BY ID

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await users.findOne({ where: { id } });
    data.isDelete = true;
    data.save();
    res.status(200).json({
      staus: "success",
      message: "soft delete users data",
      data: `${data.email} has deleted`,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
