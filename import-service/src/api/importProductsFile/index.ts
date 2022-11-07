import { createRequestError } from '~/utils/createRequestError';
import { getSignedUrl } from '~/s3/api/getSignedUrl';
import { AWS_S3_BUCKET_NAME, AWS_S3_UPLOADED_PREFIX } from '~/config';

export const importProductsFile = async (fileName: string): Promise<string> => {
    try {
        return await getSignedUrl({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${AWS_S3_UPLOADED_PREFIX}/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv',
        });
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
