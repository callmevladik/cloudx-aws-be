import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-west-1' });

export const DynamoDBClient = new AWS.DynamoDB.DocumentClient();
