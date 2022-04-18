require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./app/models");

//routes
const userRoutes = require("./app/routes/users");

const port = process.env.APP_PORT || 3002;
const app = express();

//midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
const apiUrl = "/api/v1";
app.use(apiUrl, userRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "oke boooks",
  });
});

//handling error
app.use((req, res, next) => {
  const err = new Error(
    `${req.method} => ${req.hostname}${req.path} not found`
  );
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "developmpnet" ? err : {};
  res.status(err.status || 500).json({
    status: "failed",
    message: err.message,
  });
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Success connect database`);
  } catch (error) {
    console.log(error.message);
  }
  console.log(`server running on port ${port}`);
});
