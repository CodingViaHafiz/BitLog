//import dependencies
const express = require("express");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 1000;

// initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
// import routes
const authRoutes = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");

// connect to mongoDB
connection();

app.get("/", (req, res) => {
  res.send("");
});

// routes middleware
app.use("/", authRoutes);
app.use("/posts", postRoute);
app.use("/users", userRoute);

// start the server
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
