# Open Source Repository Web Crawler 🕷

[![🕷️ Repo Crawler](https://github.com/spencerlepine/open-source-crawler/actions/workflows/repo-crawler.yml/badge.svg?branch=main)](https://github.com/spencerlepine/open-source-crawler/actions/workflows/repo-crawler.yml) [![🧐 Repo Analyzer](https://github.com/spencerlepine/open-source-crawler/actions/workflows/repo-analyzer.yml/badge.svg?branch=main)](https://github.com/spencerlepine/open-source-crawler/actions/workflows/repo-analyzer.yml) [![🚀 Deploy Lambda](https://github.com/spencerlepine/open-source-crawler/actions/workflows/deply-lambda.yml/badge.svg?branch=main)](https://github.com/spencerlepine/open-source-crawler/actions/workflows/deply-lambda.yml) [![📝 Status Reporter](https://github.com/spencerlepine/open-source-crawler/actions/workflows/status-reporter.yml/badge.svg?branch=main)](https://github.com/spencerlepine/open-source-crawler/actions/workflows/status-reporter.yml)

GitHub Repository web crawler and security scanner to streamline my contributions to open source on GitHub. 

Uses scheduled GitHub Actions invoking AWS Lambda functions connected to Redis database.

## 🌟 How It's Built

![Project Walk-through Video Thumbnail](TODO)

- Development Process - [Blog Post](TODO) | [Medium Post](TODO)
- Project Walk-through - [Youtube Video](TODO)
- Project Walk-through Slideshow - [Google Slides](https://docs.google.com/presentation/d/1sANVXPe05rDFzKI7B5r8jIwC-Qpg4v47SLCIn9kdRBA/edit?usp=sharing)

## 🧰 Technologies
- [GitHub Actions](TODO)
- [Node.js](TODO)
- [AWS Lambda](TODO)
- [Redis](TODO)

## Documentation

- [Installation](docs/installation.md)
- [Getting Started](docs/getting-started.md)
- Components:
  - [GitHub Actions](docs/actions.md)
  - [Lambda Functions](docs/lambda.md)
  - [Repository Secrets](docs/secrets.yml)

## Diagrams

![Architecture Diagram](./docs/images/architecture.png)

![Repositories Diagram](./docs/images/repositories-diagram.png)

![Deploy Diagram](./docs/images/deploy-diagram.png)

![Database Diagram](./docs/images/database-diagram.png)

[![Crawler Flowchart](./docs/images/crawl-flowchart.png)](https://lucid.app/lucidchart/925ad38a-d164-4034-a4a0-22d597ddddb4/edit?invitationId=inv_d8842df8-7a6a-489d-9435-456aac29975c#)

![Crawler Workflow](./docs/images/crawl-workflow.png)

[![Analyze Flowchart](./docs/images/analyze-flowchart.png)](https://lucid.app/lucidchart/a50e19b9-94d8-40d8-a879-0b79fd790d7b/edit?invitationId=inv_1bfc44f5-3683-4870-b9c9-643dc327df9e#)

![Analyze Workflow](./docs/images/analyze-workflow.png)