# Neptune Lambda Stack - Chapter 3

This stack adds a Lambda to the VPC created by the Neptune stack. The Lambda queries the Netune database.

## Requires

- Node (LTS version recommended: https://nodejs.org/en/)
- Serverless Framework CLI tool `npm global add serverless`
- AWS account with credentials (Easy 5 minute guide: https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## How To

This stack has dependencies so you'll need to run:
```sh
npm install
``` 

Deploy (after the neptune stack has completed deployment):
```sh
sls deploy
```

Remove (remove this stack before the neptune stack):
```sh
sls remove
```

Note: if using an AWS profile, use the --aws-profile switch, e.g. 
```
sls deploy --aws-profile go-serverless-graphdb
```