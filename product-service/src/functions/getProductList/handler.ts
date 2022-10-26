import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getProductList } from '~/api/getProductList';

const getProductListHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: getProductListHandler');

    try {
        const products = await getProductList();

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

export const main = middyfy(getProductListHandler);
