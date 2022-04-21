const { Op } = require("sequelize");
const { books, categories, books_category } = require("../../models");

function findOrCreateCategory(categor) {
  return categories
    .findAll({
      where: {
        name: {
          [Op.in]: [categor],
        },
      },
      attributes: ["name"],
    })
    .then((value) => {
      const find = value.map((item) => item.name);
      const newItem = [];
      for (const item of categor) {
        if (!find.includes(item)) {
          const saveIt = categories.create({ name: item });
          return saveIt;
        }
      }
      return newItem;
    });
}

// Create Books
exports.createBook = async (req, res, next) => {
  const { tittle, author, publisher, year, image, desc, category } = req.body;
  const userId = req.user.id;

  try {
    //get Categoies from database
    const newCategory = await findOrCreateCategory(category);

    return res.json({
      newCategory,
    });

    res.status(201).json({
      status: "success",
      message: "create books",
      data: createData,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
