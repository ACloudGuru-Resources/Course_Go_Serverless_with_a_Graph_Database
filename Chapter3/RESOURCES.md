# Resources for Chapter 3

## Lesson 2: Understanding the stacks

### Replication resources:
Neptune replication overview:
https://docs.aws.amazon.com/neptune/latest/userguide/feature-overview-replication.html

Managing a cluster with the console (handy guide but I recommend applying this as to your stacks as cloudformation updates):
https://docs.aws.amazon.com/neptune/latest/userguide/manage-console.html

Chapter 3 of the A Cloud Guru course, "Introduction to RDS":
https://acloud.guru/learn/aws-rds

## Lesson 3: Understanding the neptune cloudformation

More info on CidrBlocks and subnets:
https://www.digitalocean.com/community/tutorials/understanding-ip-addresses-subnets-and-cidr-notation-for-networking


## Lab: Remove the stacks

### Known issue: ENI Clean up error
The ENI cleanup plugin occasionally fails - this happened for me once when I deployed and removed several times in succession. The error I get in my sls remove output is:

"VPC ENI Cleanup: Error: The interface attachment '...' does not exist."

When this happens the API stack will take a while to remove. This is because the ENI cleanup is being handled by AWS. In CF you will see a message like 

"CloudFormation is waiting for NetworkInterfaces associated with the Lambda Function to be cleaned up."

Here's some discussions of this isuue:
- https://forum.serverless.com/t/very-long-delay-when-doing-sls-remove-of-lambda-in-a-vpc/2535/9
- https://stackoverflow.com/questions/47957820/lambda-in-vpc-deletion-takes-more-time