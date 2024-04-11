const Auth = require("../models/authz.js"); // import model
const bcrypt = require("bcrypt"); // import bcrypt fo hashing
require("dotenv").config();
const jwt = require("jsonwebtoken"); // importing jwt

const secKey = process.env.JWT_SEC; // extract secret key from env file

// ****************** Route Handler for Signup*****************

exports.signup = async (req, res) => {
  try {
    // fetch data from model
    const { name, email, password, role } = req.body;

    // check if user exist or not
    const userExist = await Auth.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //secure password by hashing it
    let hashPass;
    try {
      hashPass = await bcrypt.hash(password, 10); // hashing password with 10 saltRound
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to hash password",
      });
    }

    // create entry in database
    const response = await Auth.create({
      name,
      email,
      password: hashPass,
      role,
    });

    // send success flag with response status
    res.status(200).json({
      success: true,
      data: response,
      message: "User registration Succesfull",
    });

    //  handle error
  } catch (err) {
    console.log(err);
    // console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "data not Found",
    });
  }
};

// ****************** Route Handler for Login*****************

exports.login = async (req, res) => {
  try {
    // fetch data from model
    const { email, password } = req.body;

    // check password is same of not
    let user = await Auth.findOne({ email }); // the first entry where email will match , it will return whole data to the user object

    // if user not found in database
    if (!user) {
      return res.status(208).json({
        success: false,
        message: "user not found",
      });
    }

    // if user found then match the password
    const passMatch = await bcrypt.compare(password, user.password);

    // create options and payload to put in jwt header

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // const options = {
    //   expiry: "2hr",
    // };

    if (passMatch) {
      // if password match then add jwt token

      const token = jwt.sign(payload, secKey);

      user = user.toObject();
      // create a new entry to the database using user object
      user.token = token;

      // but user also contains password so remove it from user object
      user.password = undefined;

      // now create a cookie and set it with response
      res.cookie("userCookie", user, {
        maxAge: 3600000,
        httpOnly: true, // httpOnly means , cookie data will not be accessible on client side
        secure: true,
        token,
      });

      // send success flag with response status code
      res.status(200).json({
        success: true,
        token,
        user,
        payload,
        message: "Authentication done , thankyou for loging in",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Password did not matched",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Login error",
    });
  }
};
