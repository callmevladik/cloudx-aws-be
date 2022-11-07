import { createRequestError } from '~/utils/createRequestError';
import { AWS_S3_BUCKET_NAME } from '~/config';
import csv from 'csv-parser';
import { S3Client } from '~/clients/s3';
import { SQSClient } from '~/clients/sqs';
import { Context } from 'aws-lambda';

export const importFileParser = async (
    key: string,
    context: Context,
): Promise<any> => {
    const csvFile = S3Client.getObject({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
    }).createReadStream();

    const parsedData = [];

    const parserFcn = new Promise((resolve, reject) => {
        csvFile
            .pipe(csv())
            .on('error', () => {
                reject('csv parse process failed');
            })
            .on('data', data => {
                console.log('Data parsed: ', data);
                // @ts-ignore
                parsedData.push(data);
            })
            .on('end', () => {
                resolve('csv parse process finished');
            });
    });

    try {
        await parserFcn;

        for (const item of parsedData) {
            const message = JSON.stringify(item);

            try {
                await SQSClient.sendMessage({
                    QueueUrl: `https://sqs.${
                        context.invokedFunctionArn.split(':')[3]
                    }.amazonaws.com/${
                        context.invokedFunctionArn.split(':')[4]
                    }/catalogItemsQueue`,
                    MessageBody: message,
                }).promise();
            } catch (e) {
                console.log('error', e);
            }
        }

        return parsedData;
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
