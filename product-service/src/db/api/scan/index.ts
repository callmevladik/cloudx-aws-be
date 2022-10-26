import { DynamoDB } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { PromiseResult } from 'aws-sdk/lib/request';

const dynamo = new DynamoDB.DocumentClient();

export const scan = async (
    params: DocumentClient.ScanInput,
    callback?: (err: AWSError, data: DocumentClient.ScanOutput) => void,
): Promise<PromiseResult<DocumentClient.ScanOutput, AWSError>> => {
    return await dynamo.scan(params, callback).promise();
};
