const { Op } = require("sequelize");
const { books, categories, books_categories } = require("../../models");

// function collections
async function findOrCreateCategories(arrayCategory, booksId) {
  const resultCategory = await Promise.all(
    arrayCategory.map((value) => {
      return categories.findOrCreate({
        where: {
          name: value,
        },
      });
    })
  );

  resultCategory.forEach((value) => {
    const categoriesId = value[0].id;
    books_categories.create({
      booksId,
      categoriesId,
    });
  });
}

// Create Books
exports.createBook = async (req, res, next) => {
  const { title, author, publisher, year, image, desc, category } = req.body;
  const userId = req.user.id;

  try {
    // create books
    const newBook = await books.create({
      title,
      author,
      publisher,
      year,
      image,
      desc,
      userId,
    });

    // find or crate categories
    findOrCreateCategories(category, newBook.id);

    res.status(201).json({
      status: "success",
      message: "create a new books",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
