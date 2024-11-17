const fs = require("fs");

fs.writeFileSync("myFile.txt", "Hello world!");
fs.appendFileSync("myFile.txt", " Hello programming!");

// read the file
const data = fs.readFileSync("myFile.txt");
console.log(data.toString());
