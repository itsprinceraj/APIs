const mongoose = require("mongoose");
require("dotenv").config();

// import url
const DB_URL = process.env.LOCALHOST; //LOCALHOST    ----- DB_URL

// Create connection to database

const dbConnect = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected Sucesfully"))
    .catch((err) => {
      console.error(err);
      console.log("Database connection issue");
      process.exit(1);
    });
};

// export the databse connection

module.exports = dbConnect;
