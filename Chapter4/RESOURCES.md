# Resources for Chapter 4


## LAB: Loading data into neptune

Occasionally the serverless variables dont work, I havent yet figured out exactly why. This is usually accompanied by a serverless framework log message along the lines of:

```
# 2506: 3 of 10 promises have settled
# 2506: 7 unsettled promises:
#  ...
# This can result from latent connections but may represent a cyclic variable dependency"
```
This can result in the environment variables not being populated in the Lambda. To resolve this you can populate the environment variables fro the Lambda via the AWS console.

Alternatively you can try to sls remove and then sls deploy again.

