import { DynamoDB } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { PromiseResult } from 'aws-sdk/lib/request';

const dynamo = new DynamoDB.DocumentClient();

export const put = async (
    params: DocumentClient.PutItemInput,
    callback?: (err: AWSError, data: DocumentClient.PutItemOutput) => void,
): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>> => {
    return await dynamo.put(params, callback).promise();
};
