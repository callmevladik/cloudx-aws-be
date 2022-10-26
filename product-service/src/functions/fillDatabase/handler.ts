import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { productsMock } from '~/mocks/products/products.mock';
import { put } from '~/db/api/put';
import { stocksMock } from '~/mocks/products/stock.mock';

const fillDatabaseHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    try {
        await Promise.all(
            productsMock.map(async product => {
                return await put({
                    TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
                    Item: {
                        ...product,
                    },
                });
            }),
        );

        await Promise.all(
            stocksMock.map(async stock => {
                return await put({
                    TableName: String(process.env.DYNAMODB_TABLE_STOCKS),
                    Item: {
                        ...stock,
                    },
                });
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
