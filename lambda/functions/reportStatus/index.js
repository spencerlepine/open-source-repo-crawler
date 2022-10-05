const generateReport = require('./generateReport')

module.exports = (handleResponse, connectRedisDB) => async (event, context, callback) => {
  const redisClient = await connectRedisDB(callback);

  const reportBody = {
    message: 'Completed crawler status report',
    report: await generateReport(redisClient)
  };

  redisClient.quit();
  handleResponse(null, callback, 200, reportBody);
};