const express = require("express");
const router = express.Router();

// import handler
const {
  imageUpload,
  videoUpload,
  imageReducer,
  localUpload,
} = require("../controllers/fileUpload.js");

// define routes for handler

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducer", imageReducer);
router.post("/localUpload", localUpload);

module.exports = router;
