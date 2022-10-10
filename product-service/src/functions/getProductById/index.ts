import { handlerPath } from '~/libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{id}',
                responseData: {
                    200: {
                        description: 'Successful operation',
                        bodyType: 'Product',
                    },
                    404: 'Product not found',
                    500: 'Server error',
                },
            },
        },
    ],
};
