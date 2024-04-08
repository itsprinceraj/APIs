const express = require("express");
const app = express();

require("dotenv").config(); // by importing dotenv file and using config method, all the code written in env file will
const PORT = process.env.PORT;

// import routes and use it

const blogRoutes = require("./routes/blogRoutes.js");

app.use(express.json()); // data has been parsed

app.use("/api/v1", blogRoutes);

// import database and use it

const dbConnect = require("./config/database");
dbConnect();

// define Default routes

app.get("/", (req, res) => {
  res.send(`<h1>Response recieved from: ${PORT}</h1>`);
});

app.listen(PORT, () => {
  console.log(`server Started at: ${PORT}`);
});
