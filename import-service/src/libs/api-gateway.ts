export const formatJSONResponse = (
    response: Record<string, unknown>,
): {
    statusCode: number;
    body: string;
    headers: {
        [key: string]: string;
    };
} => {
    return {
        statusCode: 200,
        body: JSON.stringify(response.data),
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET',
            'Access-Control-Allow-Credentials': 'true',
        },
    };
};
