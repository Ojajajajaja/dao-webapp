// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { DAO } from '../models/DAO';
import { DAOMembership } from '../models/DAOMembership';
import { DAOMembershipResponse } from '../models/DAOMembershipResponse';
import { DAOSchemaResponse } from '../models/DAOSchemaResponse';
import { DAOUpdate } from '../models/DAOUpdate';
import { InputCreateDAO } from '../models/InputCreateDAO';
import { InputCreatePOD } from '../models/InputCreatePOD';
import { POD } from '../models/POD';
import { PODMembership } from '../models/PODMembership';
import { PODMembershipResponse } from '../models/PODMembershipResponse';
import { PODSchemaResponse } from '../models/PODSchemaResponse';
import { PODUpdate } from '../models/PODUpdate';
import { PagingError } from '../models/PagingError';
import { User } from '../models/User';

/**
 * no description
 */
export class DaosApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Add an admin to a DAO
     * @param daoId 
     * @param dAOMembership 
     */
    public async addAdminToDAO(daoId: string, dAOMembership: DAOMembership, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "addAdminToDAO", "daoId");
        }


        // verify required parameter 'dAOMembership' is not null or undefined
        if (dAOMembership === null || dAOMembership === undefined) {
            throw new RequiredError("DaosApi", "addAdminToDAO", "dAOMembership");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/admins'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dAOMembership, "DAOMembership", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Add a member to a DAO
     * @param daoId 
     */
    public async addMemberToDAO(daoId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "addMemberToDAO", "daoId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/members'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Add a member to a POD
     * @param daoId 
     * @param podId 
     */
    public async addMemberToPOD(daoId: string, podId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "addMemberToPOD", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "addMemberToPOD", "podId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}/members'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create a new DAO
     * @param inputCreateDAO 
     */
    public async createDAO(inputCreateDAO: InputCreateDAO, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'inputCreateDAO' is not null or undefined
        if (inputCreateDAO === null || inputCreateDAO === undefined) {
            throw new RequiredError("DaosApi", "createDAO", "inputCreateDAO");
        }


        // Path Params
        const localVarPath = '/daos/';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(inputCreateDAO, "InputCreateDAO", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create a new POD
     * @param daoId 
     * @param inputCreatePOD 
     */
    public async createPOD(daoId: string, inputCreatePOD: InputCreatePOD, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "createPOD", "daoId");
        }


        // verify required parameter 'inputCreatePOD' is not null or undefined
        if (inputCreatePOD === null || inputCreatePOD === undefined) {
            throw new RequiredError("DaosApi", "createPOD", "inputCreatePOD");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(inputCreatePOD, "InputCreatePOD", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete a DAO
     * @param daoId 
     */
    public async deleteDAO(daoId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "deleteDAO", "daoId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

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
     * Delete a POD
     * @param daoId 
     * @param podId 
     */
    public async deletePOD(daoId: string, podId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "deletePOD", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "deletePOD", "podId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

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
     * List all DAOs
     */
    public async getAllDAOs(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/daos/';

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
     * Get all members of a POD
     * @param daoId 
     * @param podId 
     */
    public async getAllMembersOfPOD(daoId: string, podId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "getAllMembersOfPOD", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "getAllMembersOfPOD", "podId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}/members'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

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
     * Get all PODs for a DAO
     * @param daoId 
     */
    public async getAllPODsForDAO(daoId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "getAllPODsForDAO", "daoId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

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
     * Get a DAO by ID
     * @param daoId 
     */
    public async getDAOById(daoId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "getDAOById", "daoId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

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
     * Get a POD by ID
     * @param daoId 
     * @param podId 
     */
    public async getPODById(daoId: string, podId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "getPODById", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "getPODById", "podId");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

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
     * Remove an admin from a DAO
     * @param daoId 
     * @param dAOMembership 
     */
    public async removeAdminFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "removeAdminFromDAO", "daoId");
        }


        // verify required parameter 'dAOMembership' is not null or undefined
        if (dAOMembership === null || dAOMembership === undefined) {
            throw new RequiredError("DaosApi", "removeAdminFromDAO", "dAOMembership");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/admins'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dAOMembership, "DAOMembership", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Remove a member from a DAO
     * @param daoId 
     * @param dAOMembership 
     */
    public async removeMemberFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "removeMemberFromDAO", "daoId");
        }


        // verify required parameter 'dAOMembership' is not null or undefined
        if (dAOMembership === null || dAOMembership === undefined) {
            throw new RequiredError("DaosApi", "removeMemberFromDAO", "dAOMembership");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/members'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dAOMembership, "DAOMembership", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Remove a member from a POD
     * @param daoId 
     * @param podId 
     * @param pODMembership 
     */
    public async removeMemberFromPOD(daoId: string, podId: string, pODMembership: PODMembership, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "removeMemberFromPOD", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "removeMemberFromPOD", "podId");
        }


        // verify required parameter 'pODMembership' is not null or undefined
        if (pODMembership === null || pODMembership === undefined) {
            throw new RequiredError("DaosApi", "removeMemberFromPOD", "pODMembership");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}/members'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(pODMembership, "PODMembership", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update a DAO
     * @param daoId 
     * @param dAOUpdate 
     */
    public async updateDAO(daoId: string, dAOUpdate: DAOUpdate, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "updateDAO", "daoId");
        }


        // verify required parameter 'dAOUpdate' is not null or undefined
        if (dAOUpdate === null || dAOUpdate === undefined) {
            throw new RequiredError("DaosApi", "updateDAO", "dAOUpdate");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dAOUpdate, "DAOUpdate", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update a POD
     * @param daoId 
     * @param podId 
     * @param pODUpdate 
     */
    public async updatePOD(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'daoId' is not null or undefined
        if (daoId === null || daoId === undefined) {
            throw new RequiredError("DaosApi", "updatePOD", "daoId");
        }


        // verify required parameter 'podId' is not null or undefined
        if (podId === null || podId === undefined) {
            throw new RequiredError("DaosApi", "updatePOD", "podId");
        }


        // verify required parameter 'pODUpdate' is not null or undefined
        if (pODUpdate === null || pODUpdate === undefined) {
            throw new RequiredError("DaosApi", "updatePOD", "pODUpdate");
        }


        // Path Params
        const localVarPath = '/daos/{dao_id}/pods/{pod_id}'
            .replace('{' + 'dao_id' + '}', encodeURIComponent(String(daoId)))
            .replace('{' + 'pod_id' + '}', encodeURIComponent(String(podId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(pODUpdate, "PODUpdate", ""),
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

export class DaosApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to addAdminToDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async addAdminToDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to addMemberToDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async addMemberToDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to addMemberToPOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async addMemberToPODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PODMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PODMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODMembershipResponse", ""
            ) as PODMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - User already in POD", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User, DAO or POD not found", body, response.headers);
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
            const body: PODMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODMembershipResponse", ""
            ) as PODMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Invalid data", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User not found", body, response.headers);
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
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createPOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createPODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PODSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Invalid data", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Error deleting DAO", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "DAO not found", body, response.headers);
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
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deletePOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deletePODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PODSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Error deleting POD", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User, DAO or POD not found", body, response.headers);
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
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAllDAOs
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getAllDAOsWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<DAO> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<DAO> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DAO>", ""
            ) as Array<DAO>;
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
            const body: Array<DAO> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DAO>", ""
            ) as Array<DAO>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAllMembersOfPOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getAllMembersOfPODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<User> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<User> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<User>", ""
            ) as Array<User>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "DAO or POD not found", body, response.headers);
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
            const body: Array<User> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<User>", ""
            ) as Array<User>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAllPODsForDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getAllPODsForDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<POD> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<POD> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<POD>", ""
            ) as Array<POD>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: Array<POD> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<POD>", ""
            ) as Array<POD>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getDAOById
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getDAOByIdWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAO >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAO = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAO", ""
            ) as DAO;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "DAO not found", body, response.headers);
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
            const body: DAO = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAO", ""
            ) as DAO;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getPODById
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getPODByIdWithHttpInfo(response: ResponseContext): Promise<HttpInfo<POD >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: POD = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "POD", ""
            ) as POD;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "DAO or POD not found", body, response.headers);
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
            const body: POD = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "POD", ""
            ) as POD;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to removeAdminFromDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async removeAdminFromDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to removeMemberFromDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async removeMemberFromDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User or DAO not found", body, response.headers);
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
            const body: DAOMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOMembershipResponse", ""
            ) as DAOMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to removeMemberFromPOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async removeMemberFromPODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PODMembershipResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PODMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODMembershipResponse", ""
            ) as PODMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - User not in POD", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User, DAO or POD not found", body, response.headers);
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
            const body: PODMembershipResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODMembershipResponse", ""
            ) as PODMembershipResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateDAO
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateDAOWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DAOSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Invalid data", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "DAO not found", body, response.headers);
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
            const body: DAOSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DAOSchemaResponse", ""
            ) as DAOSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updatePOD
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updatePODWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PODSchemaResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(response.httpStatusCode, "Unprocessable Entity", body, response.headers);
        }
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Bad Request - Invalid data", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "Unauthorized - Invalid or missing token", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: PagingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PagingError", ""
            ) as PagingError;
            throw new ApiException<PagingError>(response.httpStatusCode, "User, DAO or POD not found", body, response.headers);
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
            const body: PODSchemaResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PODSchemaResponse", ""
            ) as PODSchemaResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
