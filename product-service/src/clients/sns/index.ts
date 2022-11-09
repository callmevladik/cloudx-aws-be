import { SNS } from 'aws-sdk';

export const SNSClient = new SNS({
    region: 'eu-west-1',
});
