import { S3 } from 'aws-sdk';
import { DEFAULT_REGION_NAME } from '~/config';

const s3 = new S3({ region: DEFAULT_REGION_NAME });

export const getSignedUrl = async (params: any): Promise<string> =>
    s3.getSignedUrl('putObject', params);
