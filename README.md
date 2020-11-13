# Serverless TODO

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created. I'm using AWS Lambda and Serverless framework to build this application.

# Getting Started

### Prerequisite

To run the application you will need:

- [AWS CLI](https://aws.amazon.com/cli/)
- An [AWS](https://console.aws.amazon.com) account
- [Serveless CLI](https://www.serverless.com/framework/docs/getting-started#via-npm)

#### Amazon Web Services (AWS)

The application uses the following services:

- [S3 Bucket](https://docs.aws.amazon.com/s3/index.html) to store images
- [DynamoDB](https://aws.amazon.com/dynamodb/) to store Todo Items
- [XRay](https://aws.amazon.com/xray/) to enable tracing
- [Lambda](https://aws.amazon.com/lambda/)
- [API Gateway](https://aws.amazon.com/api-gateway/)

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

Ren tests:

```
npm test
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

# API Endpoint

```
https://lzvmolxey8.execute-api.eu-west-3.amazonaws.com/dev/todos
```

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

```
Udacity C4 Project.postman_collection.json
```

# Travis

The project uses [Travis](https://travis-ci.org/) as CI/CD tool.
