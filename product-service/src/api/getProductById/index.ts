import { ProductInterface } from '~/mocks/products/types';
import { productsMock } from '~/mocks/products/index.mock';
import { createRequestError } from '~/utils/createRequestError';
import { StatusCodes } from '~/constants/statusCodes';

export const getProductById = async (id: number): Promise<ProductInterface> => {
    const errorMessage = `Error! Couldn't get product with id ${id}`;

    try {
        // http request function body
        const product = productsMock.find(
            ({ id: productId }) => productId === id,
        );

        if (product == null) {
            throw createRequestError(
                { statusCode: StatusCodes.NOT_FOUND },
                errorMessage,
            );
        }

        return product;
    } catch (error: any) {
        throw createRequestError(error, errorMessage);
    }
};
