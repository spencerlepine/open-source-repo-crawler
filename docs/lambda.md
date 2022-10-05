## Lambda Functions

## `crawlRepository` Function

**Name:** `<repo-name>-prod-<crawlRepository>`

**Logic:**
- Connects to Redis database to get queue of URLs
- Crawls GH repository pages for readmes and links to other projects

## `fetchAnalyzeRepoQueue` Function

**Name:** `<repo-name>-prod-<fetchAnalyzeRepoQueue>`

**Logic:**
- Connects to Redis database to get next URL from queue
- Runs `actions/checkout` on this repository
- Preforms security analysis
- Preforms typo scan
- Generates report of findings
- Responds with scan report