const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/createUser.js");
const {
  auth,
  isStudent,
  isAdmin,
} = require("../middlewares/authentication.js");

router.post("/login", login);
router.post("/signup", signup);

// Define Protected Routes

router.get("/test", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: " welcome to the protected route for test",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Protected route for Student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

module.exports = router;
