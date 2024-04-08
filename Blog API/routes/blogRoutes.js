const express = require("express");

const router = express.Router();

// import controller

const { createComment } = require("../controllers/commentControl.js");
const { createLike ,removeLike} = require("../controllers/likeControl.js");
const { createPost, getPost } = require("../controllers/postControl.js");

// mapping with controller

router.post("/comments/create", createComment);
router.post("/like", createLike);
router.post("/unlike", removeLike);
router.post("/post/create", createPost);
router.get("/posts", getPost);

module.exports = router;
