export const formatJSONResponse = (
    response: Record<string, unknown>,
): {
    statusCode: number;
    body: string;
} => {
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
