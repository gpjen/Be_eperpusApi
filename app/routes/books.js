// import package
const router = require("express").Router();

// auth
const { authToken } = require("../midleware/auth");

//import route
const { createBook, getBooks, getBookById } = require("../controllers/Books");

router.post("/books", authToken, createBook);
router.get("/books", authToken, getBooks);
router.get("/book/:id", authToken, getBookById);

module.exports = router;
