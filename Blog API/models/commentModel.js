const mongoose = require("mongoose");

// creating Schema for dataBAse

const commentModel = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId, // // reference to the post model
    ref: "Post",
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// export the schema

module.exports = mongoose.model("Comment", commentModel);
