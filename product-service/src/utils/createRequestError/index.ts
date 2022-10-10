import { RequestErrorInterface } from './types';

export const createRequestError = (
    { statusCode },
    message: any,
): RequestErrorInterface => ({
    statusCode,
    errorMessage: message,
});
