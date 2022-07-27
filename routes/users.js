var express = require("express");
var router = express.Router();
var Users = require("../models/user-model");
var passwordHash = require("password-hash");
var nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// create a user
router.post("/", function (req, res, next) {
  // generate a random password
  const max = 10;
  const min = 6;
  const generatedPassword = Math.random().toString(36).slice(2, 10);
  const hashedPassword = passwordHash.generate(generatedPassword);

  // TODO: check email and send error

  // create a user
  const newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    status: false,
    password: hashedPassword,
    accountType: "USER",
  });

  newUser.save();

  transporter.sendMail({
    to: req.body.email,
    from: "noreply@notesapp.com",
    subject: "Account Created",
    text: 'Your password is ' + generatedPassword
  });

  // TODO: send email

  res.json({
    success: true,
    data: newUser,
  });
});

// get all users
router.get("/", async function (req, res, next) {
  const allUsers = await Users.find({ accountType: "USER" });

  res.json({
    success: true,
    data: allUsers,
  });
});

// get a single user
router.get("/:userId", async function (req, res, next) {
  const user = await Users.findById(req.params.userId);

  res.json({
    success: true,
    data: user,
  });
});

// update a part of the user
router.put("/:userId", async function (req, res, next) {
  const newData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
  };
  const user = await Users.findByIdAndUpdate(req.params.userId, newData);

  res.json({
    success: true,
    data: user,
  });
});

// delete the user
router.delete("/:userId", async function (req, res, next) {
  const user = await Users.findByIdAndDelete(req.params.userId);

  res.json({
    success: true,
    data: user,
  });
});

module.exports = router;
