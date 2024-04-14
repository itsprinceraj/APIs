const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => { // connect to db 
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch((error) => {
      console.log("error aaya hai");
      console.error(error.message);
      process.exit(1);
    });
};

//  Syntax to export any function in Backend
module.exports = dbConnect;
