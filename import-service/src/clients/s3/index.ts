import { S3 } from 'aws-sdk';
import { DEFAULT_REGION_NAME } from '~/config';

export const S3Client = new S3({ region: DEFAULT_REGION_NAME });
