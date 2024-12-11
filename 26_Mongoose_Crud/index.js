const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => console.log(err));

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

// application routes
app.use("/todo", todoHandler);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.listen(3000, () => {
  console.log("app listening on port 3000");
});
