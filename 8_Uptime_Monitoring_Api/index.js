const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// app object

const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening on ${app.config.port}`);
  });
};

// req res handling
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
