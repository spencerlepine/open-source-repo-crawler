const config = require('../../config');

module.exports = async (redis) => {
  let nextQueueItem = await redis.lPop(config.CRAWLER_ANALYZE_KEY)
  let analyzeCount = 0;

  if (nextQueueItem) {
    await redis.hSet(nextQueueItem, 'hasBeenCrawled', 'true', 'hasBeenAnalyzed', 'true')
    const updatedCount = await redis.sendCommand(['INCR', 'analyzeCount']);
    analyzeCount = updatedCount
  }

  return [analyzeCount, nextQueueItem]
}