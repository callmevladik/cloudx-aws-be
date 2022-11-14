import { handlerPath } from '~/libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                cors: true,
                path: 'import',
                queryStringParameters: {
                    name: {
                        required: true,
                        type: 'string',
                    },
                },
                responseData: {
                    200: 'Successful operation',
                    500: 'Server error',
                },
                authorizer: {
                    name: 'basicAuthorizer',
                    arn: 'arn:aws:lambda:eu-west-1:147259031518:function:authorization-service-dev-basicAuthorizerHandler',
                    type: 'TOKEN',
                    identitySource: 'method.request.header.Authorization',
                },
            },
        },
    ],
};
