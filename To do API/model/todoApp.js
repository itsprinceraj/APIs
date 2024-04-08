const mongoose = require("mongoose");

// Creating Schema : Schema is basically the property and the description of what you want to build ;

const todoAppSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

// Syntax to export Schema

module.exports = mongoose.model("TodoApp", todoAppSchema); // it takes 2 argument . 1st , by which name you want to access the schema and 2nd is the schema that you created;
