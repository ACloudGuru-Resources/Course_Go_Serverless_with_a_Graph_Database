# Neptune Lambda Stack - Chapter 4

This builds on the Neptune Lambda Stack in [Chapter 3](../Chapter3/lambda/README.md) by adding a loader lambda that loads data from S3 into Neptune.

## Requires

- Node (LTS version recommended: https://nodejs.org/en/)
- Serverless Framework CLI tool `npm global add serverless`
- AWS account with credentials (Easy 5 minute guide: https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## How To

This stack has dependencies so you'll need to run:
```sh
npm install
``` 

## loading



curl -X POST \
    -H 'Content-Type: application/json' \
    http://neptunedbinstance-kltodbfmklwo.cgmqlv83pmli.us-east-1.neptune.amazonaws.com:8182/loader -d '
    {
      "source" : "s3://mbudmrekphotos/data",
      "format" : "csv",
      "iamRoleArn" : "arn:aws:iam::366399188066:role/neptune-serverless-dev-NeptuneLoadFromS3Role-164DZOATUI4F2",
      "region" : "us-east-1",
      "failOnError" : "FALSE"
    }'

curl -X POST \
    -H 'Content-Type: application/json' \
    http://neptunedbinstance-kltodbfmklwo.cgmqlv83pmli.us-east-1.neptune.amazonaws.com:8182/loader -d '{ 
        "source": "s3://mbudmrekphotos/data",
        "format: 'csv',
        "iamRoleArn: 'arn:aws:iam::366399188066:role/neptune-serverless-dev-NeptuneLoadFromS3Role-164DZOATUI4F2",
        "region: "us-east-1",
        "failOnError: "FALSE"
    }

Deploy (after the neptune stack has completed deployment):
```sh
sls deploy
```

Remove (remove this stack before the neptune stack):
```sh
sls remove
```