var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var passwordHash = require("password-hash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var notesRouter = require("./routes/notes");

var Users = require("./models/user-model");

var app = express();
var port = 3200;

// view engine setup

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

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

const seedUsers = async () => {
  const foundUsers = await Users.find();
  if (foundUsers.length === 0) {
    const newUser = new Users({
      firstName: "Admin",
      lastName: "User",
      email: "admin@gmail.com",
      dateOfBirth: new Date(),
      mobile: 9477777777,
      status: true,
      password: passwordHash.generate(process.env.ADMIN_PASSWORD),
      accountType: "ADMIN",
    });

    newUser.save();
  }
};

app.listen(port, async () => {
  console.log("Connecting to the database");

  await mongoose.connect("mongodb://localhost:27017/notes-app");

  console.log("Successfully connected to the database");

  await seedUsers();

  console.log(`Noted API listening on port ${port}`);
});
