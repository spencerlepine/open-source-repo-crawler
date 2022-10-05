## GitHub Actions

## `RedisDB Reset` Workflow

- Invokes lambda function, which communicates w/ Redis
- Erases the URL database and resets all metrics

## `Status Reporter` Workflow

- Invokes lambda function, which communicates w/ Redis
- Gathers details about the webcrawler and database memory usage
- Saves report to markdown file for job summary output
- Upload `report.md` as artifact to download from browser

## `Repo Crawler` Workflow

- Invokes lambda function, which communicates w/ Redis
- Manages Queue of URLs to crawl
- Fetches HTML document of GitHub Repository for given link
- Parses any links contained in the README file
- Adds parsed links to queue
- Add crawled links to next queue to be analyzed later

## `Deploy Lamba` Workflow

- Checks-out this repository
- Installs `serverless` npm package
- Runs the `serverless deploy` CLI command to bundle + ship the lambda functions
- Passes environment variables to Lambda functions, from the Action Secrets
- Automatically re-deploys given any change in the `/lamda` folder

## `Repo Analyzer` Workflow

- Invokes lambda function, which communicates w/ Redis
- Fetches next URL from the analyze queue
- Checkouts out the external repository
- Preforms code scan on static files
- Preforms typo scan for the README
- Pushes folder with report to an output repository
