module.exports = {
  REDIS_ENDPOINT: process.env.REDIS_ENDPOINT, // secret
  REDIS_PORT: process.env.REDIS_PORT, // secret
  REDIS_PASSWORD: process.env.REDIS_PASSWORD, // secret
  CONTRIBUTION_STORE_REPO: process.env.CONTRIBUTION_STORE_REPO, // secret
  CRAWLER_ANALYZE_KEY: 'queue:analyze', // configuration
  CRAWLER_QUEUE_KEY: 'queue:crawl', // configuration
  GITHUB_README_DOM_SELECTOR: 'readme-toc', // configuration (an html tag)
};