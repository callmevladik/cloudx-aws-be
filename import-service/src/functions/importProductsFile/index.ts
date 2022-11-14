import { handlerPath } from '~/libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
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
            },
        },
    ],
};
