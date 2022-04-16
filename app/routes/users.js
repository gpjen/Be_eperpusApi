const express = require("express");
const router = express.Router();

// models users
const { getUsers } = require("../controllers/Users");

router.get("/users", getUsers);

module.exports = router;
