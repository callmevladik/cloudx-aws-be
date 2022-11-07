import { createRequestError } from '~/utils/createRequestError';
import { StatusCodes } from '~/constants/statusCodes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DynamoDBClient } from '~/clients/dynamodb';

export const getProductList = async (): Promise<DocumentClient.ItemList> => {
    const errorMessage = `Error! Couldn't find the table "${String(
        process.env.DYNAMODB_TABLE_PRODUCTS,
    )}"`;

    try {
        const { Items } = await DynamoDBClient.scan({
            TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
        }).promise();

        if (!Items) {
            throw createRequestError(
                { statusCode: StatusCodes.BAD_REQUEST },
                errorMessage,
            );
        }

        return Items;
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
