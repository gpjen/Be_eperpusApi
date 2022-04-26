// import package
const router = require("express").Router();

// auth
const { authToken } = require("../midleware/auth");

//validtion
const {
  paramIdValidation,
  createBookValidation,
} = require("../controllers/Books/BooksValidation");

//import route
const {
  createBook,
  getBooks,
  getBookById,
  updateBooks,
  deleteBook,
} = require("../controllers/Books");

router.post("/books", authToken, createBookValidation, createBook); //create
router.get("/books", authToken, getBooks); //read all
router.get("/book/:id", authToken, paramIdValidation, getBookById); //read One
router.patch("/book/:id", authToken, updateBooks); //updaate
router.delete("/book/:id", authToken, paramIdValidation, deleteBook); //delete

module.exports = router;
