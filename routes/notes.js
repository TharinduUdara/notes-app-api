var express = require("express");
var router = express.Router();
var Notes = require("../models/note-model");
var jwt = require("jsonwebtoken");

// Create a Notes
router.post("/", async function (req, res, next) {
  const decoded = jwt.decode(req.token);

  const newNote = new Notes({
    title: req.body.title,
    description: req.body.description,
    userId: decoded.id,
  });

  await newNote.save();

  res.json({
    success: true,
    data: newNote,
  });
});

// get all Notes
router.get("/", async function (req, res, next) {
  const decoded = jwt.decode(req.token);

  const allNotes = await Notes.find({ userId: decoded.id });

  res.json({
    success: true,
    data: allNotes,
  });
});

// get a single Note
router.get("/:noteId", async function (req, res, next) {
  const notes = await Notes.findById(req.params.noteId);

  res.json({
    success: true,
    data: notes,
  });
});

// update the Note
router.put("/:noteId", async function (req, res, next) {
  const newNote = {
    title: req.body.title,
    description: req.body.description,
  };
  await Notes.findByIdAndUpdate(req.params.noteId, newNote);

  res.json({
    success: true,
    data: note,
    userId: decoded.id,
  });
});

// delete the Note
router.delete("/:noteId", async function (req, res, next) {
  const note = await Notes.findByIdAndDelete(req.params.noteId);

  res.json({
    success: true,
    data: note,
  });
});

module.exports = router;
