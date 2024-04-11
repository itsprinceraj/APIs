const jwt = require("jsonwebtoken");
require("dotenv").config();
const secKey = process.env.JWT_SEC;

// Create protected Route for Authentication

exports.auth = (req, res, next) => {
  try {
    // fetch token from req.body

    // there are three ways to fetch jwt token for authentication;

    // console.log(`cookie: ${req.cookies.token}`);
    // console.log(`body: ${req.body.token}`);
    // console.log(`header: ${req.header("Authorization")}`);

    const authHeader = req.header("Authorization");
    const token =
      (authHeader && authHeader.split(" ")[1]) ||
      req.body.token ||
      req.cookies.token; // this is the syntax for authentication using bearer header

    // const token =
    // req.cookies.token ||
    // req.body.token ||
    // req.header("Authorization").replace("Bearer" ,"")

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
      jwt.verify(token, secKey, (err, decoded) => {
        // jwt verify method returns a decoded object ;
        if (err) {
          res.status(402).json({
            success: false,
            message: "Verification Failed",
          });
        }
        // Store decoded token data in req.user
        req.user = decoded;
      });

      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Token verification Failed",
      });
    }
  } catch (err) {
    console.log(err);
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
