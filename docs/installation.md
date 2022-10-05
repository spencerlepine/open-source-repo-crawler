## Installation

#### To run the `Node.js` scripts locally, follow these instructions.

```sh
$ cd lambda
$ yarn install # npm install
$ node test.js
```

#### Configure the `serverless` package

```sh
$ yarn global serverless
$ serverless config credentials \
  --provider aws \
  --key AKIAIOSFODNN7EXAMPLE \
  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
$ serverless deploy # deploy the lambda functions manually if needed
```