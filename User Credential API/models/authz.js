const mongoose = require("mongoose");

const signUpPage = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "student", "visitor"],
  },
});

module.exports = mongoose.model("Auth", signUpPage);
