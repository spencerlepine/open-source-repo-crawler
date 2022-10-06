const getRepoFromQueue = require("./getRepoFromQueue");

module.exports =
  (handleResponse, connectRedisDB) => async (event, context, callback) => {
    const redisClient = await connectRedisDB(callback);

    const [analyzeCount, repoFromQueue] = await getRepoFromQueue(redisClient);
    if (!repoFromQueue) {
      const err = "[FAILED] unable to retrieved next URL from analyze queue";
      const errorResponse = {
        message: err,
        repoUrl: null,
        analyzeCount,
      };

      redisClient.quit();
      handleResponse(err, callback, 500, errorResponse);
      return;
    }

    const analyzeResponse = {
      message: "Retrieved next URL from analyze queue",
      repoUrl: repoFromQueue,
    };

    redisClient.quit();
    handleResponse(null, callback, 200, analyzeResponse);
  };
