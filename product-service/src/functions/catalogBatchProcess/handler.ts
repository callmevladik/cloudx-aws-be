import { APIGatewayEvent } from 'aws-lambda';
import { createRequestError } from '~/utils/createRequestError';
import { publishMessage } from '~/api/publishMessage';
import { DynamoDBClient } from '~/clients/dynamodb';

interface CatalogBatchProcessEvent extends APIGatewayEvent {
    Records: {
        body: string;
    }[];
}

const catalogBatchProcessHandler = async (
    event: CatalogBatchProcessEvent,
): Promise<void> => {
    console.log('Lambda start: catalogBatchProcess');

    try {
        await Promise.all(
            event.Records.map(async record => {
                const product = JSON.parse(record.body);
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
                } = product;

                await DynamoDBClient.put({
                    TableName: String(process.env.DYNAMODB_TABLE_PRODUCTS),
                    Item: {
                        id: Number(id),
                        title: String(title),
                        description: String(description),
                        genres: String(genres),
                        image: String(image),
                        platforms: String(platforms),
                        price: Number(price),
                        rating: Number(rating),
                        released: String(released),
                    },
                }).promise();

                await publishMessage(product);
            }),
        );
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};

export const main = catalogBatchProcessHandler;
