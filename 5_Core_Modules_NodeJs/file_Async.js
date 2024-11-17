const fs = require("fs");

// read the file
fs.readFile("myFile.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  } else {
    console.log(data.toString());
  }
});

// asynchronous that is why it will run first
console.log("hello world!");
