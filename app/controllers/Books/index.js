const { Op } = require("sequelize");
const { books, categories } = require("../../models");

// Create Books
exports.createBook = async (req, res, next) => {
  const { tittle, author, publisher, year, image, desc, category } = req.body;
  const userId = req.user.id;

  try {
    // ccheck categories
    let getCategories = await categories.findAll({
      where: { name: { [Op.in]: category } },
      attributes: ["name"],
    });

    getCategories = getCategories.map((val) => {
      return val.name;
    });

    return res.json({
      getCategories,
      newCategory,
    });
    const createData = await books.create({
      tittle,
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
      data: createData,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
