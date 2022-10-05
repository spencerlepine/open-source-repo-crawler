## Getting Started

1. Create an IAM user on AWS
  - Be sure to select `programmatic` permissions

2. Launch or configure a Redis database
  - Easily run a redis database in the cloud with [RedisLabs](https://redis.io/)
  - Save your database credentials
  - Or, run a docker container
  - Or, run a redis server on your local machine (like homebrew)

3. Configure all repository secrets
  - Reference [secrets.yml](./secrets.yml) for all variables

4. Run the `Deploy Lambda` workflow to create the functions
  - Trigger a `workflow_dispatch` event if needed

5. Run the `RedisDB Reset` workflow
  - Verify connection with lambda AND redis

6. Run the `Repo Crawl` workflow
  - This will add links to the analyze queue

7. Run the `Repo Analyze` workflow
  - This will process links from the analyze queue
  - Will push a folder to external repository with the report

8. Run the `Status Report` workflow
  - View the number of keys used, memory usage, and more.
