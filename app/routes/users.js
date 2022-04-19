const express = require("express");
const router = express.Router();

// models users
const {
  getUsersAll,
  getUserById,
  registerUser,
  updateUser,
  deleteUserById,
  loginUser,
} = require("../controllers/Users");
//validation Users
const {
  registerValidation,
  paramIdvalidation,
  usersUpdateValidation,
} = require("../controllers/Users/UsersValidation");

// authtencicate
const { authToken } = require("../midleware/auth");

router.post("/login", loginUser);
router.post("/register", registerValidation, registerUser);

router.get("/users", authToken, getUsersAll);
router.get("/user/:id", authToken, paramIdvalidation, getUserById);
router.patch("/user/:id", authToken, usersUpdateValidation, updateUser);
router.delete("/user/:id", authToken, paramIdvalidation, deleteUserById);

module.exports = router;
