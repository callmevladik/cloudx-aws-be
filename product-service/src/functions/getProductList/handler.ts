import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getProductList } from '~/api/getProductList';

const getProductListHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    try {
        const products = await getProductList();

        return formatJSONResponse({
            data: products,
        });
    } catch ({ statusCode, errorMessage }) {
        return formatJSONResponse({
            statusCode,
            error: errorMessage,
        });
    }
};

export const main = middyfy(getProductListHandler);
