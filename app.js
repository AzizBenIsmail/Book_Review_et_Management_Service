var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const { connectToMongoDB } = require('./Config/db');
const session = require('express-session');

require('dotenv').config();



var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'net DAR BLOCKCHAIN secret',
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false, // À définir sur true si vous utilisez HTTPS
    maxAge: 2 * 60 * 60,
  }
}))

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.render("error");
});

const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongoDB();
  console.log("app is running on port 5000");
});

module.exports = app;
