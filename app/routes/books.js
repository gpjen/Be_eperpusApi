// import package
const router = require("express").Router();

// auth
const { authToken } = require("../midleware/auth");

//import route
const { createBook, getBooks } = require("../controllers/Books");

router.post("/books", authToken, createBook);
router.get("/books", authToken, getBooks);

module.exports = router;
