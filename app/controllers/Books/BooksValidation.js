const { next } = require("cli");
const { body, param, validationResult } = require("express-validator");
const { books } = require("../../models");
// schema
const schema = {
  booksParamId: param("id")
    .trim()
    .isNumeric()
    .withMessage("param id must be number")
    .bail()
    .custom(async (id) => {
      const data = await books.findByPk(id);
      if (!data) {
        return Promise.reject("invalid param id");
      }
    }),
  isStringValue: ["title", "author", "publisher", "desc"].map((fieldCheck) => {
    return body(fieldCheck)
      .notEmpty()
      .withMessage(`${fieldCheck} is required`)
      .bail()
      .isString()
      .withMessage(`${fieldCheck} must be string`)
      .bail()
      .isLength({ min: 3 })
      .withMessage(`${fieldCheck} to short`)
      .bail()
      .trim()
      .toLowerCase();
  }),
};

exports.paramIdValidation = [
  schema.booksParamId,
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

exports.createBookValidation = [
  schema.isStringValue,
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
