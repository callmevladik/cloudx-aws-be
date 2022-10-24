import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { createProduct } from '~/api/createProduct';
import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from '~/constants/statusCodes';

const createProductHandler = async (
    event: APIGatewayEvent,
): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: createProductHandler');

    if (!event.queryStringParameters) {
        return formatJSONResponse({
            data: {
                statusCode: StatusCodes.BAD_REQUEST,
                error: 'No params passed',
            },
        });
    }

    const {
        id,
        title,
        description,
        genres,
        image,
        platforms,
        price,
        rating,
        released,
    } = event.queryStringParameters;

    try {
        const product = await createProduct({
            id: Number(id),
            title: String(title),
            description: String(description),
            genres: String(genres),
            image: String(image),
            platforms: String(platforms),
            price: Number(price),
            rating: Number(rating),
            released: String(released),
        });

        return formatJSONResponse({
            data: product,
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

export const main = middyfy(createProductHandler);
