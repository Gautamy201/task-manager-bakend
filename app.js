const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./api/router/userRouter");
const taskRouter = require("./api/router/taskRouter");
// difine the Express app
const app = express();

// difine mongoose
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gautamy123:Gautamy123@tornament.msfoakm.mongodb.net/Task-Manager-App?retryWrites=true&w=majority&appName=Tornament"
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection established Database is Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
});

// adding helmet to enhance your Rest API's security

app.use(helmet());

// using bodyParser  to parse JSON bodies inti JS objects

app.use(bodyParser.json());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// enabling CORS for all requests
app.options("*", cors()); // include before other routes
app.use(cors()); // Header support for Express

// difine an endPoint for user api

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Api is not valid",
  });
});

module.exports = app;
