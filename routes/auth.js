var express = require("express");
var router = express.Router();
var Users = require("../models/user-model");
var jwt = require("jsonwebtoken");

router.post("/login", async function (req, res, next) {
  const foundUser = await Users.findOne({ email: req.body.email });

  if (foundUser) {
    if (foundUser.password === req.body.password) {
      const token = jwt.sign({ id: foundUser._id, accountType: foundUser.accountType }, process.env.SECRET_KEY);
      res.json({
        success: true,
        data: token
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

module.exports = router;
