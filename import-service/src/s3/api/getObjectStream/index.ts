import { S3 } from 'aws-sdk';
import { DEFAULT_REGION_NAME } from '~/config';
import * as stream from 'stream';

const s3 = new S3({ region: DEFAULT_REGION_NAME });

export const getObjectStream = async (
    params: S3.Types.GetObjectRequest,
): Promise<stream.Readable> => {
    console.log('getObjectStream params', params);
    return s3.getObject(params).createReadStream();
};
