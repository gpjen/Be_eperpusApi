const express = require("express");
const router = express.Router();

// models users
const {
  getUsersAll,
  getUserById,
  registerUser,
  updateUser,
} = require("../controllers/Users");
//validation Users
const {
  registerValidation,
  paramIdvalidation,
  usersUpdateValidation,
} = require("../controllers/Users/UsersValidation");

router.get("/users", getUsersAll);
router.get("/user/:id", paramIdvalidation, getUserById);
router.post("/user", registerValidation, registerUser);
router.patch("/user/:id", usersUpdateValidation, updateUser);

module.exports = router;
