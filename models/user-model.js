const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: Date,
  mobile: Number,
  status: Boolean,
  password: String,
  accountType: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
