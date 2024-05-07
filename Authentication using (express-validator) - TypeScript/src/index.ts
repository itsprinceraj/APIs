import express from "express"; // instance of express
import dotenv from "dotenv"; // import environment variables
dotenv.config(); // get their all configurations
import morgan from "morgan";
import { dbConnect } from "./config/database.js";
import { userRouter } from "./routes/userRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const COOKIE_SEC = process.env.COOKIE_SECRET;

const PORT = process.env.PORT || 4000;

const app = express();

// use exporess json middlware for parsing json file
app.use(cors({ origin: "http://localhost/5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SEC));

// default route
app.get("/", (req, res) => {
  res.send(`Server Starte at ${PORT}`);
});

// use morgan -- It is a logger middleware
// it is only used in developement , Remove it in production
app.use(morgan("dev"));

// midleware routes
app.use("/api/v1", userRouter); // domain/api/v1/user/userRouter
app.use("/api/v1", chatRouter); // domain/api/v1/user/chatRouter

// connect to Database
dbConnect()
  .then(() => {
    // listen on port 5000;
    app.listen(PORT, () => console.log(`Server Initiated on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
