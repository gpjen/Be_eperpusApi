// import package
const router = require("express").Router();

// auth
const { authToken } = require("../midleware/auth");

//import route
const {
  createBook,
  getBooks,
  getBookById,
  updateBooks,
} = require("../controllers/Books");

router.post("/books", authToken, createBook); //create
router.get("/books", authToken, getBooks); //read all
router.get("/book/:id", authToken, getBookById); //read One
router.patch("/books/:id", authToken, updateBooks); //updaate

module.exports = router;
