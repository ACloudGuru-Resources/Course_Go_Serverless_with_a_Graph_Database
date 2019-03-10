# Resources for Chapter 1

## Lesson 1 - Introduction
About Steve:
Steve's Twitter handle: @mbudm
Steve's open source fotopia project: https://github.com/mbudm/fotopia-serverless

## Lesson 2 - Course Overview

ACG courses for deeper dives (not pre-requisites)
- Introduction to RDS
- Introduction to CloudFormation
- AWS Cost Control
- The Serverless Framework with GraphQL
- Advanced AWS CloudFormation
- S3 Masterclass

## Lesson 3 - Graph databases and the face categorising project

## Lesson 4 - AWS Neptune 10,000 ft view

### Further info
Industry impression on Neptune:
- https://datree.io/blog/will-aws-neptune-become-the-leader-in-graph-databases/

## Lesson 5 - AWS Neptune graph models

### Further info
Overview of models (video):
- https://neo4j.com/blog/rdf-triple-store-vs-labeled-property-graph-difference/ 

Why diff datasets may not be so great:
- https://www.zdnet.com/google-amp/article/aws-neptune-going-ga-the-good-the-bad-and-the-ugly-for-graph-database-users-and-vendors/?__twitter_impression=true

## Lesson 6 - Property Graph model
## Lesson 7 - Resource Description Framework (RDF) graph model 

## LAB: Getting set up for this course
- Node.js: https://nodejs.org (Download & install LTS version)
- - Better option is to use NVM: 
- - - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- - - nvm (osx) https://github.com/creationix/nvm
- Serverless Framework: https://serverless.com/framework/docs/providers/aws/guide/installation/
- Setting up AWS credentials (Using AWS profiles is the best option): https://serverless.com/framework/docs/providers/aws/guide/credentials/
- - We need more permissions than the recommended serverless framework minimum policy that they provide, I recommend use AdministratorAccess for this course (remember to remove these creds later, and only do this in a separate AWS account so you dont risk messing with existing production infrastructure)