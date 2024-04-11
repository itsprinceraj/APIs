const jwt = require("jsonwebtoken");
require("dotenv").config();
const secKey = process.env.JWT_SEC;

// Create protected Route for Authentication

exports.auth = (req, res, next) => {
  try {
    // fetch token from req.body
    const token = req.body.token;

    // if token does not exist , then send response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    // next();

    // if token found. Then, Start Verification

    try {
      const decoded = jwt.verify(token, secKey); // jwt verify method returns a decoded object ;

      // Store decoded token data in req.user
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Token verification Failed",
      });
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// Create protected Route for Student Route

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(402).json({
        success: false,
        message: "This is a Protected route for Student",
      });
    }
    next();
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: "User Role Does Not Matched",
    });
  }
};

// Create protected Route for Admin Route

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(402).json({
        success: false,
        message: "This is a Protected route for admin",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User Role Does Not Matched",
    });
  }
};
