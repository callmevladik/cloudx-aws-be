import { createRequestError } from '~/utils/createRequestError';
import { ProductInterface } from '~/mocks/products/types';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { DynamoDBClient } from '~/clients/dynamodb';

export const createProduct = async (
    product: ProductInterface,
): Promise<PutItemOutput> => {
    try {
        return await DynamoDBClient.put({
            TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
            Item: {
                ...product,
            },
        }).promise();
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
