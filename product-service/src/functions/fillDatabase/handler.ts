import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { productsMock } from '~/mocks/products/products.mock';
import { stocksMock } from '~/mocks/products/stock.mock';
import { DynamoDBClient } from '../../clients/dynamodb';

const fillDatabaseHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    try {
        await Promise.all(
            productsMock.map(async product => {
                return await DynamoDBClient.put({
                    TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
                    Item: {
                        ...product,
                    },
                }).promise();
            }),
        );

        await Promise.all(
            stocksMock.map(async stock => {
                return await DynamoDBClient.put({
                    TableName: String(process.env.DYNAMODB_TABLE_STOCKS),
                    Item: {
                        ...stock,
                    },
                }).promise();
            }),
        );

        return formatJSONResponse({
            data: 'Table is succesfully filled',
        });
    } catch ({ statusCode, message }) {
        return formatJSONResponse({
            data: {
                statusCode,
                error: message,
            },
        });
    }
};

export const main = middyfy(fillDatabaseHandler);
