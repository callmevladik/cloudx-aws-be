import { createRequestError } from '~/utils/createRequestError';
import { ProductInterface } from '~/mocks/products/types';
import { SNSClient } from '~/clients/sns';
import { PublishResponse } from 'aws-sdk/clients/sns';

export const publishMessage = (
    product: ProductInterface,
): Promise<PublishResponse> => {
    try {
        return SNSClient.publish({
            Subject: 'New product',
            Message: JSON.stringify(product),
            TopicArn: process.env.SNS_TOPIC_CREATE_PRODUCT,
        }).promise();
    } catch (error: any) {
        throw createRequestError(error, error.message);
    }
};
