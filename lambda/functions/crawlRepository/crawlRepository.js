const cheerio = require("cheerio");
const config = require("../../config");
const logger = require("../../logger");
const fetch = require("node-fetch");

const { GITHUB_README_DOM_SELECTOR, CRAWLER_QUEUE_KEY, CRAWLER_ANALYZE_KEY } =
  config;

const parseRepoPathFromURL = (url) => {
  if (!url) return [];
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.name)) return [];
  const { owner, name } = match.groups;
  return [owner, name, `${owner}/${name}`].map((str) => str.toLowerCase());
};

const getNextRepoFromCrawlQueue = async (redis) => {
  let nextQueueItem =
    (await redis.lPop(CRAWLER_QUEUE_KEY)) || "public-apis/public-apis";
  logger("[CRAWLING URL]", nextQueueItem, "warning");

  if (nextQueueItem.slice(0, 5) === "https") {
    nextQueueItem = parseRepoPathFromURL(nextQueueItem)[2];
  }

  return nextQueueItem;
};

const addLinkToCrawlQueue = async (redis, repository) => {
  if (repository) {
    logger("[ADD TO QUEUE]", repository);
    await redis.rPush(CRAWLER_QUEUE_KEY, repository);
  }
};

const markLinkAsCrawled = async (redis, repository) => {
  // UPDATE client.hSet('key', 'field', 'value');
  logger("[CRAWL COMPLETE]", repository, "success");
  await redis.hSet(repository, "hasBeenCrawled", "true");
  await redis.sendCommand(["INCR", "crawlCount"]);
};

const addLinkToAnalyzeQueue = async (redis, repository) => {
  logger("[ADD TO ANALYZE QUEUE]", repository, "info");
  await redis.rPush(CRAWLER_ANALYZE_KEY, repository);
};

const isBrandNewLink = async (redis, repository) => {
  if (!repository) {
    return false;
  }

  const existingHashSet = await redis.hGetAll(repository);
  if (existingHashSet) {
    return existingHashSet.hasBeenCrawled !== "true";
  } else {
    // Initialize the hash set
    await redis.hSet(
      repository,
      "hasBeenCrawled",
      "false",
      "hasBeenAnalyzed",
      "false"
    );
    return true;
  }
};

const queryDOMLinkNodes = async (repository) => {
  const response = await fetch(`https://github.com/${repository}`);
  const body = await response.text();
  const $ = cheerio.load(body);
  const readmeLinks = $(GITHUB_README_DOM_SELECTOR).find("a"); // console.log(readmeNode.text())

  const repoLinksFound = [];
  const uniqueLinks = {};
  readmeLinks.each((i, linkElem) => {
    const linkHref = linkElem.attribs.href;
    const ghPrefix = "https://github.com";
    if (linkHref.slice(0, ghPrefix.length) === ghPrefix) {
      const [owner, name, repoKey] = parseRepoPathFromURL(linkHref);
      if (uniqueLinks[repoKey] === undefined) {
        repoLinksFound.push(repoKey);
        uniqueLinks[repoKey] = 1;
      }
    }
  });
  return repoLinksFound;
};

const crawlRepositoryWebPage = async (redis) => {
  const repository = await getNextRepoFromCrawlQueue(redis);
  const validLinkToCrawl = await isBrandNewLink(redis, repository);
  if (!validLinkToCrawl) {
    logger("[INVALID URL]", repository, "error");
    return;
  }

  await markLinkAsCrawled(redis, repository);
  await addLinkToAnalyzeQueue(redis, repository);

  const repoLinksFound = await queryDOMLinkNodes(repository);
  for (let i = 0; i < repoLinksFound.length; i++) {
    await addLinkToCrawlQueue(redis, repoLinksFound[i]);
  }
};

module.exports = crawlRepositoryWebPage;
