const jwt = require("jsonwebtoken");

exports.authToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      status: "false",
      message: "access denied",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.APP_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: "infalid authenticate",
    });
    console.log(error.message);
    next(error);
  }
};
