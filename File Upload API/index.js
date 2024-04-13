const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const Upload = require("./routes/uploadRoute");
const fileUpload = require("express-fileupload"); // middleware for file upload
const { cloudConnect } = require("./config/cloudinary");

// create instance

const app = express();
app.use(express.json()); //using express parser middlewae to parse json data from req

// use fileUpload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);

// connect to database
dbConnect();

// connect to cloudinary
cloudConnect();

// define routes
app.use("/api/v1/", Upload);

// define Default Routes
app.get("/file", (req, res) => {
  res.send("<h1>This is home Page</h1>");
});

// listen on port
const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server Activated On Port ${PORT}`);
});
