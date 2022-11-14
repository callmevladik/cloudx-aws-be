import type { AWS } from '@serverless/typescript';
import {
    importFileParserHandler,
    importProductsFileHandler,
} from '~/functions';
import { AWS_S3_BUCKET_NAME, DEFAULT_REGION_NAME } from '~/config';

const serverlessConfiguration: AWS = {
    service: 'import-service',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: ['s3:*'],
                        Resource: [`arn:aws:s3:::${AWS_S3_BUCKET_NAME}`],
                    },
                    {
                        Effect: 'Allow',
                        Action: ['s3:*'],
                        Resource: [`arn:aws:s3:::${AWS_S3_BUCKET_NAME}/*`],
                    },
                    {
                        Effect: 'Allow',
                        Action: 'sqs:*',
                        Resource: `arn:aws:sqs:eu-west-1:147259031518:catalogItemsQueue`,
                    },
                ],
            },
        },
        stage: 'dev',
        region: DEFAULT_REGION_NAME,
    },
    // import the function via paths
    functions: {
        importProductsFileHandler,
        importFileParserHandler,
    },
    resources: {
        Resources: {
            GatewayResponseDefault4XX: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin':
                            "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers':
                            "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Methods':
                            "'*'",
                    },
                    ResponseType: 'DEFAULT_4XX',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi',
                    },
                },
            },
        },
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
