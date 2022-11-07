import { RequestErrorInterface } from '~/utils/createRequestError/types';

export const createRequestError = (
    { statusCode }: any,
    message: any,
): RequestErrorInterface => ({
    statusCode,
    message,
});
