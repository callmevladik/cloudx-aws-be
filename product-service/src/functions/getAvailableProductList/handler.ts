import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getAvailableProductList } from '~/api/getAvailableProductList';

const getAvailableProductListHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    try {
        const products = await getAvailableProductList();

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

export const main = middyfy(getAvailableProductListHandler);
