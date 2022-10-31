import { createRequestError } from '~/utils/createRequestError';
import { AWS_S3_BUCKET_NAME } from '~/config';
import csv from 'csv-parser';
import { getObjectStream } from '~/s3/api/getObjectStream';

export const importFileParser = async (key: string): Promise<any> => {
    const csvFile = await getObjectStream({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
    });

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

        console.log('parsedData', parsedData);

        return parsedData;
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
