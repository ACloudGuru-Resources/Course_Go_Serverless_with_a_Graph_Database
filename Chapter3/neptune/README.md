# Neptune Stack

This stack is a bare minimum AWS Neptune implementation. 

## Requires

- Node (LTS version recommended: https://nodejs.org/en/)
- Serverless Framework CLI tool `npm global add serverless`
- AWS account with credentials (Easy 5 minute guide: https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## How To

Deploy:
```sh
sls deploy
```

Remove (remove the lambda stack before the this stack):
```sh
sls remove
```