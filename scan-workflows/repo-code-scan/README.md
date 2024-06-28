# RepoScan [![CI](https://github.com/spencerlepine/repo-scan/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/spencerlepine/repo-scan/actions/workflows/ci.yml)

> ⚠️ This is a part of the [spencerlepine/open-source-crawler](https://github.com/spencerlepine/open-source-crawler) project

A reusable composite action to scan repositories for typos/security issues and easily store report outputs.

## Basic Usage

Scan a repository, view GITHUB_JOB_SUMMARY output from the actions, and download the `final-report` folder upload as an artifact.

```
name: Repository Scan 
on: 
 push:

jobs:
  test-action:
    runs-on: ubuntu-latest
    steps:
      - name: ✅ Run action.yml to verify all steps pass
        uses: spencerlepine/repo-scan@main
        with:
          repository: ${{ github.repository }}
          typo-scan-exclude-match: '[''typos/**'', ''public/**'']'
```


## Advanced Usage

Scan an external repository, and archive the report in a repository you own.

> Make sure you add `PERSONAL_ACCESS_TOKEN: <GITHUB_ACCESS_TOKEN>` to Repository Secrets. This should have WRITE access to the archive repository, so it can upload the folders

```
name: Repository Scan w/ Report Archive
on: 
 push:

## -- CHANGE THIS --
env:
  # Scan THIS repository
  repository: ${{ github.repository }}
  # Scan EXTERNAL repository
  external-repo: facebook/react

jobs:
  test-action:
    runs-on: ubuntu-latest
    steps:
      - name: ✅ Run action.yml to verify all steps pass
        uses: spencerlepine/repo-scan@main
        with:
          repository: ${{ env.repository }}
          typo-scan-exclude-match: '[''typos/**'', ''public/**'']'
          REPORT_ARCHIVE_OWNER: spencerlepine
          REPORT_ARCHIVE_REPO: repo-scan-archive-test
          ARCHIVE_REPO_BRANCH_TARGET: main
          ARCHIVE_COMMIT_EMAIL: commit-bot@gmail.com
          ARCHIVE_REPO_ACCESS_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```
