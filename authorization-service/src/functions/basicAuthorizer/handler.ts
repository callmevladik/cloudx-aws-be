import { APIGatewayAuthorizerResult, APIGatewayEvent } from 'aws-lambda';
import { middyfy } from '~/libs/lambda';

enum PolicyEffects {
    ALLOW = 'allow',
    DENY = 'deny',
}

const generatePolicy = (
    principalId: string,
    resource: string,
    effect = PolicyEffects['ALLOW'],
): APIGatewayAuthorizerResult => ({
    principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    },
});

const basicAuthorizerHandler = async (
    event: APIGatewayEvent,
): Promise<APIGatewayAuthorizerResult> => {
    console.log('Lambda start: basicAuthorizerHandler');

    const {
        // @ts-ignore
        authorizationToken,
        // @ts-ignore
        methodArn,
        // @ts-ignore
        type: eventType,
    } = event;

    if (eventType !== 'REQUEST') {
        return generatePolicy(
            authorizationToken,
            methodArn,
            PolicyEffects['DENY'],
        );
    }

    try {
        const buff = Buffer.from(authorizationToken, 'base64');
        const [userName, userPassword] = buff.toString('utf-8').split(':');

        console.log(`userName: ${userName}, userPassword: ${userPassword}`);

        const storedPassword = process.env[userName];
        const effect =
            !storedPassword || storedPassword !== userPassword
                ? PolicyEffects['DENY']
                : PolicyEffects['ALLOW'];
        return generatePolicy(authorizationToken, methodArn, effect);
    } catch ({ statusCode, message }) {
        return generatePolicy(
            authorizationToken,
            methodArn,
            PolicyEffects['DENY'],
        );
    }
};

export const main = basicAuthorizerHandler;
