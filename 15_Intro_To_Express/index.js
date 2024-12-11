const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/", (req, res) => {
  res.send("POST request received!");
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
