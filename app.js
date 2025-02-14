var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const { connectToMongoDB } = require('./Config/db');
const session = require('express-session');
const passport = require("./Config/passportConfig");

require('dotenv').config();




var usersRouter = require("./routes/usersRouter");
var booksRouter = require("./routes/booksRouter");
var reviewsRouter = require("./routes/reviewsRouter");
var messageDiscordRouter = require("./routes/messageDiscordRouter");
var authGoogleRouter = require("./routes/authGoogleRouter");
var authDiscordRouter = require("./routes/authDiscordRouter");
var generationRouter = require("./routes/generationOpenIARouter");
var generationGeminiRouter = require("./routes/generationGeminiRouter");
var generationDeepseekRouter = require("./routes/generationDeepseekRouter");
var generationAnthropicRouter = require("./routes/generationAnthropicRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.Net_Secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false, // À définir sur true si vous utilisez HTTPS
    maxAge: 2 * 60 * 60,
  }
}))
// Initialiser passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/reviews", reviewsRouter);
app.use("/generation", generationRouter);
app.use("/authGoogle",authGoogleRouter );
app.use("/authDiscord", authDiscordRouter);
app.use("/messageDiscord", messageDiscordRouter);
app.use("/generationGemini", generationGeminiRouter);
app.use("/generationDeepseek", generationDeepseekRouter);
app.use("/generationAnthropic", generationAnthropicRouter);





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
  res.json("error");
});

const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongoDB();
  console.log("app is running on port 5000");
});

module.exports = app;
