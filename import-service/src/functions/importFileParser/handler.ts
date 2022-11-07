import { formatJSONResponse } from '~/libs/api-gateway';
import { importFileParser } from '~/api/importFileParser';
import { APIGatewayEvent, Context } from 'aws-lambda';

interface ImportFileParserHandlerEvent extends APIGatewayEvent {
    Records: {
        s3: {
            object: {
                key: string;
            };
        };
    }[];
}

const importFileParserHandler = async (
    event: ImportFileParserHandlerEvent,
    context: Context,
): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: importProductsFile');

    const key = event.Records[0].s3.object.key;

    try {
        const object = await importFileParser(key, context);

        return formatJSONResponse({
            data: object,
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

export const main = importFileParserHandler;
