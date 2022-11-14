import middy from '@middy/core';
import cors from '@middy/http-cors';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const middyfy = (handler): APIGatewayProxyHandler => {
    return middy(handler).use(middyJsonBodyParser()).use(cors());
};
