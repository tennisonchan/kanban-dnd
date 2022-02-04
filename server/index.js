const express = require("express");
const path = require("path");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const staticPath = path.resolve(__dirname, "../build/static");
const buildPath = path.resolve(__dirname, "../build");
const indexPath = path.resolve(__dirname, "../build/index.html");

app.use("/", indexRouter);

app.use("/", express.static(buildPath));
app.use("/static", express.static(staticPath));
app.get("/*", (req, res) => {
  res.sendFile(indexPath);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  dbName: process.env.DB_NAME,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

module.exports = app;
