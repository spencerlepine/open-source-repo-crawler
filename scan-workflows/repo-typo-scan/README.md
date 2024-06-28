# RepoTypoScan Reusable Action [![CI](https://github.com/spencerlepine/repo-typo-scan/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/spencerlepine/repo-typo-scan/actions/workflows/ci.yml)

> ⚠️ This is a part of the [spencerlepine/open-source-crawler](https://github.com/spencerlepine/open-source-crawler) project

Scan repository source code for typos with a reusable action.

## Basic Usage

Create a `typo.yml` workflow file, and execute the typo scan on the current repository.

```yml
# .github/workflows/typo.yml

name: Typo Scan
on: 
 push:

jobs:
  test-action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Scan source code for typos
        uses: spencerlepine/repo-typo-scan@main
        with:
          repository: ${{ github.repository }}
          scan-exclude-match: '[''typos/**'', ''public/**'']'
          report-folder-name: typos-scan-output-artifact
```

## Scan External Repository

Alternatively, easily run this scan on an external repository

```yml
# .github/workflows/typo.yml

name: External Scan
on: 
 push:

jobs:
  test-action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Scan external source code for typos
        uses: spencerlepine/repo-typo-scan@main
        with:
          repository: npm/registry
          scan-exclude-match: '[''typos/**'', ''public/**'']'
          report-folder-name: custom-folder-name
```
