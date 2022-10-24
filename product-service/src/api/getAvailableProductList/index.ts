import { createRequestError } from '~/utils/createRequestError';
import { scan } from '~/db/api/scan';
import { StatusCodes } from '~/constants/statusCodes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const getAvailableProductList =
    async (): Promise<DocumentClient.ItemList> => {
        const errorMessage = `Error! Couldn't find the table "${String(
            process.env.DYNAMODB_TABLE_PRODUCTS,
        )}"`;

        try {
            const { Items: productList } = await scan({
                TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
            });

            if (!productList) {
                throw createRequestError(
                    { statusCode: StatusCodes.BAD_REQUEST },
                    errorMessage,
                );
            }

            const { Items: stockList } = await scan({
                TableName: String(process.env.DYNAMODB_TABLE_STOCKS),
            });

            if (!stockList) {
                throw createRequestError(
                    { statusCode: StatusCodes.BAD_REQUEST },
                    errorMessage,
                );
            }

            return productList.map(product => {
                const productStockCount = stockList.find(
                    stock => product.id === stock.id,
                );

                return {
                    ...product,
                    count: productStockCount?.count,
                };
            });
        } catch (error: any) {
            throw createRequestError(error, error.message);
        }
    };
