import { handlerPath } from '~/libs/handler-resolver';
import { AWS_S3_BUCKET_NAME, AWS_S3_UPLOADED_PREFIX } from '~/config';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            s3: {
                bucket: AWS_S3_BUCKET_NAME,
                event: 's3:ObjectCreated:*',
                rules: [
                    {
                        prefix: `${AWS_S3_UPLOADED_PREFIX}/`,
                    },
                ],
                existing: true,
            },
        },
    ],
};
