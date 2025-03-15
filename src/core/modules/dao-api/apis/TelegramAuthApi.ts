// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { ConnectionResponse } from '../models/ConnectionResponse';
import { DisconnectResponse } from '../models/DisconnectResponse';
import { OAuthError } from '../models/OAuthError';
import { TelegramAuth } from '../models/TelegramAuth';

/**
 * no description
 */
export class TelegramAuthApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Removes the connection between the user\'s account and their Telegram account.
     * Disconnect Telegram account
     */
    public async disconnectTelegram(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/auth/telegram/disconnect';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Handles the authentication data from the Telegram Login Widget.
     * Process Telegram authentication data
     * @param telegramAuth 
     */
    public async telegramCallback(telegramAuth: TelegramAuth, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'telegramAuth' is not null or undefined
        if (telegramAuth === null || telegramAuth === undefined) {
            throw new RequiredError("TelegramAuthApi", "telegramCallback", "telegramAuth");
        }


        // Path Params
        const localVarPath = '/auth/telegram/callback';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(telegramAuth, "TelegramAuth", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class TelegramAuthApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to disconnectTelegram
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async disconnectTelegramWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DisconnectResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Error disconnecting account", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "No connection found", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Unauthorized", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DisconnectResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DisconnectResponse", ""
            ) as DisconnectResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Default error response", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DisconnectResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DisconnectResponse", ""
            ) as DisconnectResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to telegramCallback
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async telegramCallbackWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ConnectionResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ConnectionResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConnectionResponse", ""
            ) as ConnectionResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Error saving connection", body, response.headers);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Invalid or missing data", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Unauthorized", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Default error response", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ConnectionResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConnectionResponse", ""
            ) as ConnectionResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
