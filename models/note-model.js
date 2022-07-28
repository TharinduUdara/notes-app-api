const { default: mongoose } = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
userId: String
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
