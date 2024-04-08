const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    // fetch data from req body

    const { post, user, body } = req.body;

    // create new comment object first

    const comment = new Comment({ post, user, body });

    // create entry in database

    const savedComment = await comment.save();

    // const response = await Comment.create({ post, user, body });

    // fetch post by id and add comment id into the comments array

    const updatedComment = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    // send success flag in response

    res.status(200).json({
      success: true,
      post: updatedComment,
      message: `Comments added succesfully ${updatedComment}`,
    });
  } catch (err) {
    // console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "comment add krne me issue aa rha h",
    });
  }
};
