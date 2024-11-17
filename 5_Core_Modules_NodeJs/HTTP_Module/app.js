const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(".........Hello From NodeJs Server........");
    res.end();
  } else if (req.url === "/about") {
    res.write("This is NodeJS About Page");
    res.end();
  } else {
    res.write("Page not found!!!!!!!");
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000...");
