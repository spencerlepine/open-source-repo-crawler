# Open Source Repo Crawler Project 🕷 ![Inactive Badge](./.github/inactive.svg)

![AWS](https://img.shields.io/badge/AWS-lambda-orange.svg?style=for-the-badge&logo=aws-lambda&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

An automated way to "code-review" random Open Source GitHub projects. Instead of manually searching for projects to contribute to, I built this to streamline the process.

This project consists of three parts:
  - **Web Crawler** to find *Open Source* GitHub repositories
  - **Code Scanner** to clone repositories, and identify typos + vulnerabilities.
  - **Repository** to store *reports* of each scanned repository: https://github.com/spencerlepine/open-source-crawler-output

> Everything is serverless, built with GitHub Actions, AWS Lambda, and Redis (in-memory NoSQL db)

## 🎥 Project Walk-through Video

[!["Project Walk-through Video Thumbnail"](./docs/images/readme-thumbnail.png)](https://www.youtube.com/channel/UCBL6vAHJZqUlyJp-rcFU55Q)

## 🧰 Tech Stack

- [GitHub Actions](https://github.com/features/actions)
- [Node.js](https://nodejs.org/en)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Redis](https://redis.io/) (in-memory NoSQL db)

## Deployment

![Deplyoment](./docs/images/open-source-crawler-deployment-diagram.jpg)

## 📄 Documentation

- [Installation](docs/installation.md)
- [Getting Started](docs/getting-started.md)
- Components:
  - [GitHub Actions](docs/actions.md)
  - [Lambda Functions](docs/lambda.md)
  - [Repository Secrets](docs/secrets.yml)

## 📊 Diagrams

![Architecture Diagram](./docs/images/architecture.png)

![Repositories Diagram](./docs/images/repositories-diagram.png)

![Deploy Diagram](./docs/images/deploy-diagram.png)

![Database Diagram](./docs/images/database-diagram.png)

![Concerns Diagram](./docs/images/concerns.png)

![Crawler Start List Example](./docs/images/crawler-start-list.png)

[![Crawler Flowchart](./docs/images/crawl-flowchart.png)](https://lucid.app/lucidchart/925ad38a-d164-4034-a4a0-22d597ddddb4/edit?invitationId=inv_d8842df8-7a6a-489d-9435-456aac29975c#)

![Crawler Workflow](./docs/images/crawl-workflow.png)

![Crawler Queue Example](./docs/images/url-queue-example.png)

[![Analyze Flowchart](./docs/images/analyze-flowchart.png)](https://lucid.app/lucidchart/a50e19b9-94d8-40d8-a879-0b79fd790d7b/edit?invitationId=inv_1bfc44f5-3683-4870-b9c9-643dc327df9e#)

![Analyze Workflow](./docs/images/analyze-workflow.png)
