var express = require("express");
var router = express.Router();


//Health Endpoint 
router.get("/", function (req, res, next) {
  res.send("Hello from Notes API");
});

module.exports = router;
