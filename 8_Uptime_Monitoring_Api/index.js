const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
// app object

const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    // console.log(`environment: ${process.env.NODE_ENV}`);
    console.log(`listening on ${environment.port}`);
  });
};

// req res handling
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
