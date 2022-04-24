const { Op } = require("sequelize");
const { books, categories, books_categories } = require("../../models");

// function collections
async function findCategory(categor) {
  let find = await categories.findAll({
    where: { name: { [Op.in]: [categor] } },
  });
  find = find.map((value) => value.name);

  const newCategory = categor.filter((value) => {
    if (!find.includes(value)) {
      categories.create({ name: value });
      return value;
    }
  });
  return newCategory;
}

// Create Books
exports.createBook = async (req, res, next) => {
  const { title, author, publisher, year, image, desc, category } = req.body;
  const userId = req.user.id;

  try {
    //create books
    const newBook = await books.create({
      title,
      author,
      publisher,
      year,
      image,
      desc,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "create books",
      newBook,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
