import { createRequestError } from '~/utils/createRequestError';
import { StatusCodes } from '~/constants/statusCodes';
import { query } from '~/db/api/query';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const getProductById = async (
    id: number,
): Promise<DocumentClient.ItemList> => {
    const errorMessage = `Error! Couldn't get product with id ${id}`;

    try {
        const { Items } = await query({
            TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            },
        });

        if (!Items?.length) {
            throw createRequestError(
                { statusCode: StatusCodes.NOT_FOUND },
                errorMessage,
            );
        }

        return Items;
    } catch (error: any) {
        console.log(error);
        throw createRequestError(error, error.message);
    }
};
