import { createRequestError } from '~/utils/createRequestError';
import { AWS_S3_BUCKET_NAME, AWS_S3_UPLOADED_PREFIX } from '~/config';
import { S3Client } from '~/clients/s3';

export const importProductsFile = async (fileName: string): Promise<string> => {
    try {
        return S3Client.getSignedUrl('putObject', {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${AWS_S3_UPLOADED_PREFIX}/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv',
        });
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
