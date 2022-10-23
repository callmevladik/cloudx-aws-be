import { ProductInterface } from '~/mocks/products/types';
import { productsMock } from '~/mocks/products/index.mock';
import { createRequestError } from '~/utils/createRequestError';

export const getProductList = async (): Promise<ProductInterface[]> => {
    try {
        // http request function body
        return productsMock;
    } catch (error: any) {
        throw createRequestError(error, "Error! Couldn't get products list.");
    }
};
