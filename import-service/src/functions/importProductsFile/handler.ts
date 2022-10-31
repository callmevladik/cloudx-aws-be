import { formatJSONResponse } from '~/libs/api-gateway';
import { middyfy } from '~/libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from '~/constants/statusCodes';
import { importProductsFile } from '~/api/importProductsFile';

const importProductsFileHandler = async (
    event: APIGatewayEvent,
): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: importProductsFile');

    if (!event.queryStringParameters) {
        return formatJSONResponse({
            data: {
                statusCode: StatusCodes.BAD_REQUEST,
                error: 'No params passed',
            },
        });
    }

    if (!event.queryStringParameters.name) {
        return formatJSONResponse({
            data: {
                statusCode: StatusCodes.BAD_REQUEST,
                error: 'Required param {name} is undefined',
            },
        });
    }

    const {
        queryStringParameters: { name: fileName },
    } = event;

    try {
        const signedUrl = await importProductsFile(fileName);

        return formatJSONResponse({
            data: signedUrl,
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

export const main = middyfy(importProductsFileHandler);
