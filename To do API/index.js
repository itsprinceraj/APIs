const express = require("express");
const app = express();
// loading port from env.config

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Import routes and define

const todorRoutes = require("./routes/todoRoutes");

// use middleware to parse data , if you skip this proces error will be occured and you cant see data while testing

app.use(express.json()); // data has been parsed

// mount API routes

app.use("/api/v1", todorRoutes);

// import and connect database

const dbConnect = require("./config/database");
dbConnect();

// default route;   ...... This default api route is optional to show something on ui

app.get("/", (req, res) => {
  res.send(`<h1>THIS IS THE HOMEPAGE</h1>`);
});

// Start Server

app.listen(PORT, () => {
  console.log(`server started at: ${PORT}`);
});
