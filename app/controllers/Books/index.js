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

// read books and asociate
exports.getBooks = async (req, res, next) => {
  try {
    const data = await books.findAll({
      include: {
        model: categories,
        as: "categories",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      status: "success",
      message: "get books data",
      data: data.length > 0 ? data : "no data books",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// get book by Id
exports.getBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await books.findOne({
      where: { id },
      include: {
        model: categories,
        as: "categories",
      },
    });

    res.status(200).json({
      status: "success",
      message: "get data by id",
      data,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

//update books by Id
exports.updateBooks = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, publisher, year, image, desc, category } = req.body;
  try {
    //update book
    const data = await books.update(
      {
        title,
        author,
        publisher,
        year,
        image,
        desc,
      },
      {
        where: { id },
      }
    );

    if (category.length > 0) {
      // destroy books_categories
      books_categories.destroy({
        where: {
          booksId: id,
        },
      });

      // add new categories
      findOrCreateCategories(category, id);
    }

    res.status(200).json({
      status: "success",
      message: "update data book",
      data,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
