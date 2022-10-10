import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { getProductById } from '~/api/getProductById';
import { APIGatewayEvent } from 'aws-lambda';
import { createRequestError } from '~/utils/createRequestError';
import { StatusCodes } from '~/constants/statusCodes';

const getProductByIdHandler = async (event: APIGatewayEvent) => {
    try {
        const productId = event.pathParameters?.id;

        if (!productId) {
            throw createRequestError(
                { statusCode: StatusCodes['BAD_REQUEST'] },
                `Error! Unexpected id type`,
            );
        }

        const product = await getProductById(productId);

        return formatJSONResponse({
            product,
        });
    } catch ({ statusCode, errorMessage }) {
        return formatJSONResponse({
            statusCode,
            error: errorMessage,
        });
    }
};

export const main = middyfy(getProductByIdHandler);
