// require("dotenv").config(); do not use this ... it is not working so use the below line
require("dotenv/config");

const express = require("express");

const app = express();

// required the router file
const router = require("./router/auth-router");

const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// const PORT = 8000;

const PORT = process.env.PORT;

// using middle ware to parse the incoming data in the form of JSON
app.use(express.json());

// we have chosen the home path as /api/auth based on convention
app.use("/api/auth", router);

// so every route of our website should be on the router folder inside a filed based on functionalities
// so that our server file could be clean.

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening.... on ` + PORT);
  });
});
