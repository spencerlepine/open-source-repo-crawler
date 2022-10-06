const config = require("../../config");
const fetch = require("node-fetch");

const gatherDatabaseInfo = async (redisClient) => {
  const redisDBInfo = {};

  redisDBInfo["keyCount"] = await redisClient.sendCommand(["DBSIZE"]);

  const memoryInfo = await redisClient.sendCommand(["INFO", "MEMORY"]);
  memoryInfo.split("\n").map((line) => {
    if (line.match(/used_memory_human/)) {
      redisDBInfo["usedMemory"] = line.split(":")[1];
    } else if (line.match(/used_memory_peak_human/)) {
      redisDBInfo["maxMemory"] = line.split(":")[1];
    }
  });

  return redisDBInfo;
};

const getContribStoreSize = async () => {
  const contribStoreFetch = await fetch(
    `https://api.github.com/repos/spencerlepine/${config.CONTRIBUTION_STORE_REPO}`
  );
  const data = await contribStoreFetch.json();
  return data.size + "KB";
};

const gatherCountValues = async (redisClient) => {
  // const crawlCount = await redisClient.sendCommand(['INCR', 'crawlCount']);
  // const analyzeCount = await redisClient.sendCommand(['INCR', 'analyzeCount']);
  const crawlCount = await redisClient.get("crawlCount");
  const analyzeCount = await redisClient.get("analyzeCount");

  return [Number(crawlCount), Number(analyzeCount)];
};

module.exports = async (redisClient) => {
  const [crawlCount, analyzeCount] = await gatherCountValues(redisClient);

  const reportBody = {
    redisDB: await gatherDatabaseInfo(redisClient),
    urlsCrawled: crawlCount,
    reposAnalyzed: analyzeCount,
    contribStoreRepoSize: await getContribStoreSize(),
  };

  return reportBody;
};
