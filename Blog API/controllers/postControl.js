const Post = require("../models/postModel.js");

exports.createPost = async (req, res) => {
  try {
    //fetch data from req body

    const { title, body } = req.body;

    const response = await Post.create({ title, body });

    // send success flag

    res.status(200).json({
      success: true,
      post: response,
      message: "Post Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Post create krne m issue aa rha h ",
    });
  }
};

// handeling get post network call

exports.getPost = async (req, res) => {
  try {
    //fetch data from req body

    const response = await Post.find({});

    // send success flag

    res.status(200).json({
      success: true,
      post: response,
      message: "Mil gaya Post",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "did not get any post",
    });
  }
};
