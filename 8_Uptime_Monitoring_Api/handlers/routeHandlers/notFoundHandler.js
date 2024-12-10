const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Your request url is not available",
  });
};

module.exports = handler;
