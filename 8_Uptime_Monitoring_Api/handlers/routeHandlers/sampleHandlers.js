const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    Message: "This is a sample message URL",
  });
};

module.exports = handler;
