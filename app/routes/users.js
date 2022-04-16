const express = require("express");
const router = express.Router();

// models users
const { getUsers, getUserById, registerUser } = require("../controllers/Users");

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", registerUser);

module.exports = router;
