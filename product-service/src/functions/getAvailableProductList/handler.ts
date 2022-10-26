import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getAvailableProductList } from '~/api/getAvailableProductList';

const getAvailableProductListHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: getAvailableProductListHandler');

    try {
        const products = await getAvailableProductList();

        return formatJSONResponse({
            data: products,
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

export const main = middyfy(getAvailableProductListHandler);
