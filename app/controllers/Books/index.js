const { Op } = require("sequelize");
const { books, categories } = require("../../models");

// function collections
async function findCategory(categor) {
  let findCategory = await categories.findAll({
    where: { name: { [Op.in]: [categor] } },
  });
  findCategory = findCategory.map((value) => value.name);

  const newCategory = categor.filter((value) => {
    if (!findCategory.includes(value)) {
      categories.create({ name: value });
      return value;
    }
  });
  return newCategory;
}

async function createBooksCategory(newCategory, booksId) {
  // await booksCategory.create({ booksId: 2, categoriesId: 1 });
  // let category = await categories.findAll({
  //   where: {
  //     name: {
  //       [Op.in]: newCategory,
  //     },
  //   },
  // });
  // category.forEach((value) => {
  //   console.log(booksId, " <--> ", value.id);
  //   booksCategory.create({ booksId: 2, categoriesId: 1 });
  // });
}

// Create Books
exports.createBook = async (req, res, next) => {
  const { title, author, publisher, year, image, desc, category } = req.body;
  const userId = req.user.id;

  try {
    createBooksCategory(["novel", "sejarah"], 2);
    console.log("===============");

    return res.json({
      s: "okkk",
    });

    // find new Category
    const newCategory = await findCategory(category);

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

    // create books_categories
    createBooksCategory(newCategory, newBook.id);

    return res.json({
      newCategory,
      newBook,
    });

    res.status(201).json({
      status: "success",
      message: "create books",
      data: {
        newBook: {
          ...newBook.dataValues,
          category,
        },
        newCategory,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
