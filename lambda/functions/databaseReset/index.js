const config = require("../../config");
const logger = require("../../logger");

const { CRAWLER_QUEUE_KEY, CRAWLER_ANALYZE_KEY } = config;

const admin = {
  clearQueue: async (redis) => {
    await redis.del(CRAWLER_QUEUE_KEY);
    logger("[ADMIN]", "flushed all queues", "warning");
  },
  flushKeys: async (redis) => {
    await redis.sendCommand(["FLUSHALL"]);
    logger("[ADMIN]", "flushed all keys", "warning");
  },
  flushCounts: async (redis) => {
    await redis.del("crawlCount");
    await redis.del("analyzeCount");
    logger("[ADMIN]", "flushed counter", "warning");
  },
  logEntries: async (redis) => {
    const keys = await redis.sendCommand(["DBSIZE"]);
    logger("[ADMIN LOG]", `keys: ${keys}`, "warning");

    const crawlQueue = await redis.lRange(CRAWLER_QUEUE_KEY, 0, -1);
    logger(
      "[ADMIN LOG]",
      `queue:crawl: ${crawlQueue.join("\n")} (length: ${crawlQueue.length})`,
      "warning"
    );

    const analyzeQueue = await redis.lRange(CRAWLER_ANALYZE_KEY, 0, -1);
    logger(
      "[ADMIN LOG]",
      `queue:analyze: ${analyzeQueue.join("\n")} (length: ${
        analyzeQueue.length
      })`,
      "warning"
    );
  },
};

const addLinkToCrawlQueue = async (redis, repository) => {
  logger("[ADD TO QUEUE]", repository);
  await redis.rPush(CRAWLER_QUEUE_KEY, repository);
};

const seedDatabase = async (redis) => {
  // ADMIN FUNCTIONS
  await admin.flushKeys(redis);
  await admin.clearQueue(redis);
  await admin.flushCounts(redis);
  await admin.logEntries(redis);

  let starterRepos = [
    "public-apis/public-apis",
    "sereneblue/awesome-oss",
    "n0shake/Public-APIs",
    "VNAPNIC/public-apis",
    "sindresorhus/awesome",
    "matiassingers/awesome-readme",
  ];
  for (let i = 0; i < starterRepos.length; i++) {
    await addLinkToCrawlQueue(redis, starterRepos[i]);
  }
};

module.exports =
  (handleResponse, connectRedisDB) => async (event, context, callback) => {
    const redisClient = await connectRedisDB(callback);

    await seedDatabase(redisClient);

    const adminResponse = {
      message: `Completed admin action`,
      input: event,
    };

    redisClient.quit();
    handleResponse(null, callback, 200, adminResponse);
  };
