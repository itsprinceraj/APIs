const express = require("express");
const cookieParser = require("cookie-parser"); // importing cookie-parser
const app = express(); // create express instance
require("dotenv").config(); // it converts all configs in .env to process object

const PORT = process.env.PORT;

// use middleware to parse data from req.body
app.use(express.json());
app.use(cookieParser())

// import db and establish connection
const dbConnect = require("./config/database.js");
dbConnect();

// Import and define routes
const user = require("./routes/route.js");
app.use("/api/v1", user);

// default route
app.get("/", (req, res) => {
  res.send(`<h1>Hello World on Port: ${PORT}</h1>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
