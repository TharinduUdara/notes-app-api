var express = require("express");
var router = express.Router();
var Users = require("../models/user-model");
var jwt = require("jsonwebtoken");
var passwordHash = require("password-hash");

router.post("/login", async function (req, res, next) {
  const foundUser = await Users.findOne({ email: req.body.email });

  if (foundUser) {
    const validPassword = passwordHash.verify(
      req.body.password,
      foundUser.password
    );
    if (validPassword) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          accountType: foundUser.accountType,
          status: foundUser.status,
        },
        process.env.SECRET_KEY
      );
      res.json({
        success: true,
        data: token,
      });
    } else {
      res.status(401).json({
        success: false,
      });
    }
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

router.post("/reset", async function (req, res, next) {
  const foundUser = await Users.findOne({ _id: req.body._id });
  const hashedPassword = passwordHash.generate(req.body.password);

  if (foundUser) {
    await Users.findByIdAndUpdate(req.body._id, {
      password: hashedPassword,
      status: true
    });

    res.json({
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
    });
  }
});

module.exports = router;
