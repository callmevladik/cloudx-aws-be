import { createRequestError } from '~/utils/createRequestError';
import { ProductInterface } from '~/mocks/products/types';
import { put } from '~/db/api/put';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';

export const createProduct = async (
    product: ProductInterface,
): Promise<PutItemOutput> => {
    try {
        return await put({
            TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
            Item: {
                ...product,
            },
        });
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
