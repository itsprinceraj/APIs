const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
require("dotenv").config();
// const MAIL_HOST = process.env.MAIL_HOST;
// const MAIL_USER = process.env.MAIL_USER;
// const MAIL_PASS = process.env.MAIL_PASS;
const send = require("../config/sendMail");

// Create a Schema
const FileModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// write post middleware for sending mail after creating entry in database
// middleware must be written in between of creation and export of schema
FileModel.post("save", send.SendMail);

// export the schema
module.exports = mongoose.model("File", FileModel);
