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
router.get("/users", authToken, getUsersAll);
router.get("/user/:id", paramIdvalidation, getUserById);
router.post("/register", registerValidation, registerUser);
router.patch("/user/:id", usersUpdateValidation, updateUser);
router.delete("/user/:id", paramIdvalidation, deleteUserById);

module.exports = router;
