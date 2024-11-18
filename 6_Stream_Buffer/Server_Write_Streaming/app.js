const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

ourReadStream.on("data", (chunk) => {
  ourWriteStream.write(chunk);
});

console.log("Hello I am Processing Like a Stream Data");
