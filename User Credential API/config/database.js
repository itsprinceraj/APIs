// import mongoose to create data base
const mongoose = require("mongoose");

require("dotenv").config(); // import env file

//fetch url from env file
const DATABASE_URL = process.env.DATABASE_URL;

//create a function for database connection
function dbConnect() {
  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connection Established"))
    .catch((err) => {
      console.log("DB Connection issues hai");
      console.error(err);
      process.exit(1); // it is the way of communicating with OS
    });
}

//export db function
module.exports = dbConnect;
