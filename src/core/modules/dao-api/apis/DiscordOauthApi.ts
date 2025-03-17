// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { DisconnectResponse } from '../models/DisconnectResponse';
import { OAuthError } from '../models/OAuthError';
import { OAuthResponse } from '../models/OAuthResponse';
import { UserInfoError } from '../models/UserInfoError';

/**
 * no description
 */
export class DiscordOauthApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Redirects the user to Discord\'s authorization page to begin the OAuth flow.
     * Initiate Discord OAuth flow
     */
    public async connectDiscord(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/auth/discord/connect';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Removes the connection between the user\'s account and their Discord account.
     * Disconnect Discord account
     */
    public async disconnectDiscord(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/auth/discord/disconnect';

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
     * Processes the callback from Discord after user authorization.
     * Handle Discord OAuth callback
     */
    public async discordCallback(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/auth/discord/callback';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DiscordOauthApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to connectDiscord
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async connectDiscordWithHttpInfo(response: ResponseContext): Promise<HttpInfo<OAuthResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: OAuthResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthResponse", ""
            ) as OAuthResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
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
            const body: OAuthResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthResponse", ""
            ) as OAuthResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to disconnectDiscord
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async disconnectDiscordWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DisconnectResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DisconnectResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DisconnectResponse", ""
            ) as DisconnectResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
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
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Error disconnecting account", body, response.headers);
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
     * @params response Response returned by the server for a request to discordCallback
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async discordCallbackWithHttpInfo(response: ResponseContext): Promise<HttpInfo< void>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("302", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Redirect to frontend with success or error status", undefined, response.headers);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: OAuthError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "OAuthError", ""
            ) as OAuthError;
            throw new ApiException<OAuthError>(response.httpStatusCode, "Database error", body, response.headers);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: UserInfoError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UserInfoError", ""
            ) as UserInfoError;
            throw new ApiException<UserInfoError>(response.httpStatusCode, "User info retrieval failed", body, response.headers);
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
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
