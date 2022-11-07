import type { AWS } from '@serverless/typescript';

import {
    getProductByIdHandler,
    getProductListHandler,
    getAvailableProductListHandler,
    fillDatabaseHandler,
    createProductHandler,
    catalogBatchProcessHandler,
} from '~/functions/index';

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '3',
    plugins: [
        'serverless-auto-swagger',
        'serverless-esbuild',
        'serverless-offline',
    ],
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
            DYNAMODB_TABLE_PRODUCTS: 'aws-cloudx-dynamodb-table-products',
            DYNAMODB_TABLE_STOCKS: 'aws-cloudx-dynamodb-table-stocks',
            SNS_TOPIC_CREATE_PRODUCT: { Ref: 'createProductTopic' },
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: ['dynamodb:*'],
                        Resource: '*',
                    },
                    {
                        Effect: 'Allow',
                        Action: ['sqs:*'],
                        Resource: [
                            {
                                'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
                            },
                        ],
                    },
                    {
                        Effect: 'Allow',
                        Action: ['sns:*'],
                        Resource: {
                            Ref: 'createProductTopic',
                        },
                    },
                ],
            },
        },
        stage: 'dev',
        region: 'eu-west-1',
    },
    // import the function via paths
    functions: {
        getProductListHandler,
        getAvailableProductListHandler,
        getProductByIdHandler,
        fillDatabaseHandler,
        createProductHandler,
        catalogBatchProcessHandler,
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
        autoswagger: {
            title: 'product-service',
            useStage: true,
            basePath: '/dev',
            typefiles: ['./src/mocks/products/types.ts'],
        },
    },
    resources: {
        Resources: {
            catalogItemsQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: 'catalogItemsQueue',
                },
            },
            createProductTopic: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: 'createProductTopic',
                },
            },
            createProductSubscription: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'vladyslav_palyvoda@epam.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'createProductTopic',
                    },
                },
            },
        },
    },
};

module.exports = serverlessConfiguration;
