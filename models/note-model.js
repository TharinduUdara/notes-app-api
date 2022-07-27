const { default: mongoose } = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,

});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
