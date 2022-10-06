"use strict";

const connectRedisDB = require("./database");

const handleResponse = (err, callback, statusCode, body) => {
  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body,
  };
  callback(err, response);
};

module.exports.crawlRepository = require("./functions/crawlRepository")(
  handleResponse,
  connectRedisDB
);
module.exports.fetchAnalyzeRepoQueue =
  require("./functions/fetchAnalyzeRepoQueue")(handleResponse, connectRedisDB);
module.exports.reportStatus = require("./functions/reportStatus")(
  handleResponse,
  connectRedisDB
);
module.exports.databaseReset = require("./functions/databaseReset")(
  handleResponse,
  connectRedisDB
);
