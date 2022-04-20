// import package
const router = require("express").Router();

// auth
const { authToken } = require("../midleware/auth");

//import route
const { createBook } = require("../controllers/Books");

router.post("/books", authToken, createBook);

module.exports = router;
