const cloudinary = require("cloudinary").v2;
require("dotenv").config;
// import from env and use
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// SetUp configuration to cloudinary
exports.cloudConnect = async (req, res) => {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
};
