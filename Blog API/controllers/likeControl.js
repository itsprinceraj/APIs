const Post = require("../models/postModel");
const Like = require("../models/likeModel.js");

exports.createLike = async (req, res) => {
  try {
    //fetch data form req body
    const { post, user } = req.body;

    // create new like object and it'll be added in the like array as id

    const like = new Like({
      post,
      user,
    });

    // create enty in data base
    const savedLike = await like.save();

    // find the post and push  like id in  like array

    const updatedLike = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    )
      // .populate("likes")
      // .populate("comments")
      // .exec();

    // send success flag in response

    res.status(200).json({
      success: true,
      post: updatedLike,
      message: `likes added succesfully`,
    });
  } catch (err) {
    // console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      post: err.message,
      message: "likes nahi aa rhe h bhai",
    });
  }
};

//**************************handling unlike controller*******************

exports.removeLike = async (req, res) => {
  try {
    //fetch data form req body
    const { post, like } = req.body;

    // create enty in data base
    const deletedLike = await Like.findOneAndDelete({
      post: post,
      _id: like,
    });

    // find the post and push  like id in  like array

    const updatedLike = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deletedLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .populate("comments")
      .exec();

    // send success flag in response

    res.status(200).json({
      success: true,
      post: updatedLike,
      message: `likes removed succesfully ${updatedLike}`,
    });
  } catch (err) {
    // console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "likes hatane mein issue aa rha h",
    });
  }
};
