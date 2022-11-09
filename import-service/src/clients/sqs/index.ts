import { SQS } from 'aws-sdk';

export const SQSClient = new SQS({ region: 'eu-west-1' });
