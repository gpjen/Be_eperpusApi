require("dotenv/config");
const express = require("express");
const morgan = require("morgan");

const port = process.env.APP_PORT || 3002;
const app = express();

//midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.get("/test", (req, res) => {
  res.json({
    message: "oke boooks",
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
