const crawlRepository = require('./crawlRepository')

module.exports = (handleResponse, connectRedisDB) => async (event, context, callback) => {
  const redisClient = await connectRedisDB(callback);

  await crawlRepository(redisClient)

  const crawlerResponse = {
    message: `Completed repository page crawls`,
    input: event,
  };

  redisClient.quit();
  handleResponse(null, callback, 200, crawlerResponse);
};