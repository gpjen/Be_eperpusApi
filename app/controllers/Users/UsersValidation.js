const { users } = require("../../models");
const { body, param, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const schema = {
  paramId: param("id")
    .trim()
    .isNumeric()
    .withMessage("params must be number")
    .bail()
    .custom(async (val) => {
      const userId = await users.findOne({
        where: {
          [Op.and]: [{ id: val }, { isDelete: false }],
        },
      });
      if (!userId) {
        return Promise.reject("invalid params Id");
      }
    }),
  name: body("name")
    .notEmpty()
    .withMessage("The name is required")
    .bail()
    .trim()
    .toLowerCase()
    .isLength({ min: 3 })
    .withMessage("The name is to short")
    .matches(/^[a-zA-Z]+\.?\s?([a-zA-Z]+\.?\s?)+$/)
    .withMessage("The name cannot contain numbers"),
  email: body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("The email canot valid")
    .bail()
    .custom(async (email) => {
      const userEmail = await users.findOne({ where: { email } });
      if (userEmail) return Promise.reject("email already in use");
    }),
  phone: body("phone")
    .optional({ nullable: true })
    .isString()
    .trim()
    .withMessage("The phone must be string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("minimum phone length 10")
    .matches(/^[0-9\+-]+\.?\s?([0-9]+\.?\s?)+$/)
    .withMessage("Phone number not falid")
    .bail()
    .custom(async (phone) => {
      const userPhone = await users.findOne({ where: { phone } });
      if (userPhone) return Promise.reject("Phone already in use");
    }),
  password: body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("minimum password is 6 character")
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
    .withMessage("Password must contain uppercase, lowercase and numbers"),
  status: body("status")
    .toLowerCase()
    .trim()
    .isIn(["admin", "teacher", "student"])
    .withMessage("status user invalid"),
  emailUpdate: body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("The email canot valid")
    .bail()
    .custom(async (email, { req }) => {
      const { id } = req.params;
      const user = await users.findOne({ where: { id } });
      if (user.email !== email) {
        const userEmail = await users.findOne({ where: { email } });
        if (userEmail) return Promise.reject("email already in use");
      }
    }),
  phoneUpdate: body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .bail()
    .isString()
    .trim()
    .withMessage("The phone must be string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("minimum phone length 10")
    .matches(/^[0-9\+-]+\.?\s?([0-9]+\.?\s?)+$/)
    .withMessage("Phone number not falid")
    .bail()
    .custom(async (phone, { req }) => {
      const { id } = req.params;
      const user = await users.findOne({ where: { id } });
      if (user.phone !== phone) {
        const userPhone = await users.findOne({ where: { phone } });
        if (userPhone) return Promise.reject("Phone already in use");
      }
    }),
  passwordUpdate: body("password")
    .optional({ nullable: true })
    .isLength({ min: 6 })
    .withMessage("minimum password is 6 character")
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
    .withMessage("Password must contain uppercase, lowercase and numbers"),
};

//validation userregistration
exports.registerValidation = [
  schema.name,
  schema.email,
  schema.phone,
  schema.password,
  schema.status,
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "failed data validation",
        error: error.errors,
      });
    }
    next();
  },
];

//validation one by id in param
exports.paramIdvalidation = [
  schema.paramId,
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "failed param validation",
        error: error.errors,
      });
    }
    next();
  },
];

//validation users UPDATE
exports.usersUpdateValidation = [
  schema.paramId,
  schema.name,
  schema.emailUpdate,
  schema.phoneUpdate,
  schema.passwordUpdate,
  schema.status,
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "validation update user",
        error: error.errors,
      });
    }
    next();
  },
];
