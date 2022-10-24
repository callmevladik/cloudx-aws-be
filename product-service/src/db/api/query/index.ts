import { DynamoDB } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { PromiseResult } from 'aws-sdk/lib/request';

const dynamo = new DynamoDB.DocumentClient();

export const query = async (
    params: DocumentClient.QueryInput,
    callback?: (err: AWSError, data: DocumentClient.QueryOutput) => void,
): Promise<PromiseResult<DocumentClient.QueryOutput, AWSError>> => {
    return await dynamo.query(params, callback).promise();
};
