const mongoose = require("mongoose"); // importing mongoose to conncet server with database

require("dotenv").config(); // by importing dotenv file and using config method, all the code written in env file will

const URL = process.env.DEFAULT_URL;
const dbConnect = () => {
  mongoose //  connecting with database
    .connect(URL, {
      useNewUrlParser: true, // required
      useUnifiedTopology: true, // required
    })
    .then(console.log("Database connected Succesfully"))
    .catch((error) => {
      console.log("DB connection Issus");
      console.error(error);
      process.exit(1);  // 
    });
};

module.exports = dbConnect;
