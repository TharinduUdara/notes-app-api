var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  res.send("Hello from Notes API");
});

router.get("/", function (req, res, next) {
  res.send("Hello from Notes API");
});

router.get("/:noteId", function (req, res, next) {
  res.send("Hello from Notes API");
});

router.put("/:noteId", function (req, res, next) {
  res.send("Hello from Notes API");
});

router.delete("/:noteId", function (req, res, next) {
  res.send("Hello from Notes API");
});

module.exports = router;
