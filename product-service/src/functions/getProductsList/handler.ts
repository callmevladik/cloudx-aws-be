import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getProductsList } from '~/api/getProductsList';

const getProductsListHandler = async () => {
    try {
        const products = await getProductsList();

        return formatJSONResponse({
            products,
        });
    } catch ({ statusCode, errorMessage }) {
        return formatJSONResponse({
            statusCode,
            error: errorMessage,
        });
    }
};

export const main = middyfy(getProductsListHandler);
