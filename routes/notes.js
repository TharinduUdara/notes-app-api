var express = require("express");
var router = express.Router();
var Notes = require("../models/note-model");

// Create a Notes
router.post("/", async function (req, res, next) {
  const newNote = new Notes({
    title: req.body.title,
    description: req.body.description,
  });

  await newNote.save();

  res.json({
    success: true,
    data: newNote,
  });
});


// get all Notes
router.get("/", async function (req, res, next) {
  const allNotes = await Notes.find();

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
    data: note,
  });
});

// update the Note
router.put("/:noteId", async function (req, res, next) {
  const newNote = {
    title: req.body.title,
    description: req.body.description,
  };
  const notes = await Notes.findByIdAndUpdate(req.params.noteId, newData);

  res.json({
    success: true,
    data: note,
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
