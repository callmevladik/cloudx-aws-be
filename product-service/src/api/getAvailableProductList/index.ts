import { ProductInterface } from '~/mocks/products/types';
import { productsMock } from '~/mocks/products/index.mock';
import { createRequestError } from '~/utils/createRequestError';

export const getAvailableProductList = async (): Promise<
    ProductInterface[]
> => {
    try {
        // http request function body
        return productsMock.filter(({ count }) => count > 0);
    } catch (error: any) {
        throw createRequestError(
            error,
            "Error! Couldn't get available products list.",
        );
    }
};
