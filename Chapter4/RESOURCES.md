# Resources for Chapter 4

## Understanding Rekognition
Auto generating S3 Bucket names. You can use AWS::NoValue to auto generate a bucket name.

The issue is that we quickly run into circular dependency issues… (https://aws.amazon.com/premiumsupport/knowledge-center/unable-validate-circular-dependency-cloudformation/)
We need the bucket name at the sls deploy stage so that it can be used for the lambda permission and also added as an env variable for the node.js lambdas.

Another alternative would be to separate the S3 bucket creation as another stack and then use the sls framework to read the bucket as an output of that stack and use that as an environemnt variable for our Lambdas, or do something similar using nested stacks. For this course, I've decided to keep things as simple as possible.

## Lab: Loading data into Neptune
Pre requisites for loading data into Neptune - the documentation that I didnt read properly and forgot to do the 'Adding the IAM Role to an Amazon Neptune Cluster' step. 
https://docs.aws.amazon.com/neptune/latest/userguide/bulk-load-tutorial-IAM.html

### Update on IAM role association
After completing this chapter I heard back again from AWS support with another update and some tips on how to automate the association of the IAM role to the DB cluster via cloudformation. A snippet of cloudfomation in this template does the trick:
https://s3.amazonaws.com/aws-neptune-customer-samples/v2/cloudformation-templates/neptune-ec2-client.json

```
 "Fn::If": [
    "AttachBulkloadIAMRoleToNeptuneClusterCondition",
    {
        "Fn::Join": ["", [
        "aws neptune add-role-to-db-cluster ",
        "--region ",
        {
                "Ref": "AWS::Region"
        },
        " --db-cluster-identifier ",
        {
                "Ref": "NeptuneDBCluster"
        },
        " --role-arn ",
        {
                "Ref": "NeptuneLoadFromS3IAMRoleArn"
        },
        "\n"
        ]]
```

That's a snippet from the UserData config, an area for adding CLI commands to be run in an EC2 instance. Adapting the above to a Lambda that calls the AWS API for use in the stacks in this course would be the next logical step. Using the neptune API:

https://docs.aws.amazon.com/neptune/latest/apiref/API_AddRoleToDBCluster.html

For now I will keep this as a manual step in this course, and add this to the list of possible future enhancements.
