import { formatJSONResponse } from '~/libs/api-gateway';
import { importFileParser } from '~/api/importFileParser';

const importFileParserHandler = async (
    event: any,
): Promise<{
    statusCode: number;
    body: string;
}> => {
    console.log('Lambda start: importProductsFile');

    const key = event.Records[0].s3.object.key;

    try {
        const object = await importFileParser(key);
        console.log('object', object);

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
