const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

ourReadStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

console.log("Hello I am Processing Like a Stream Data");
