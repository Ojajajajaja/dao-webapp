import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { ChallengeRequest } from '../models/ChallengeRequest';
import { ChallengeResponse } from '../models/ChallengeResponse';
import { DAO } from '../models/DAO';
import { DAOMembership } from '../models/DAOMembership';
import { DAOUpdate } from '../models/DAOUpdate';
import { InputCreateUser } from '../models/InputCreateUser';
import { InputUpdateUser } from '../models/InputUpdateUser';
import { Item } from '../models/Item';
import { ItemsResponse } from '../models/ItemsResponse';
import { LoginResponse } from '../models/LoginResponse';
import { LogoutResponse } from '../models/LogoutResponse';
import { ModelError } from '../models/ModelError';
import { POD } from '../models/POD';
import { PODMembership } from '../models/PODMembership';
import { PODUpdate } from '../models/PODUpdate';
import { PODUserWhoMadeRequest } from '../models/PODUserWhoMadeRequest';
import { PaginationMetadata } from '../models/PaginationMetadata';
import { PagingError } from '../models/PagingError';
import { SummaryResponse } from '../models/SummaryResponse';
import { User } from '../models/User';
import { UserBasic } from '../models/UserBasic';
import { UserExistResponse } from '../models/UserExistResponse';
import { UserResponse } from '../models/UserResponse';
import { VerifySignature } from '../models/VerifySignature';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiGetWalletChallengeRequest {
    /**
     * 
     * @type ChallengeRequest
     * @memberof AuthApigetWalletChallenge
     */
    challengeRequest: ChallengeRequest
}

export interface AuthApiLogoutRequest {
}

export interface AuthApiVerifyWalletSignatureRequest {
    /**
     * 
     * @type VerifySignature
     * @memberof AuthApiverifyWalletSignature
     */
    verifySignature: VerifySignature
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Generate a challenge message for Solana wallet signature authentication
     * @param param the request object
     */
    public getWalletChallengeWithHttpInfo(param: AuthApiGetWalletChallengeRequest, options?: ConfigurationOptions): Promise<HttpInfo<ChallengeResponse>> {
        return this.api.getWalletChallengeWithHttpInfo(param.challengeRequest,  options).toPromise();
    }

    /**
     * Generate a challenge message for Solana wallet signature authentication
     * @param param the request object
     */
    public getWalletChallenge(param: AuthApiGetWalletChallengeRequest, options?: ConfigurationOptions): Promise<ChallengeResponse> {
        return this.api.getWalletChallenge(param.challengeRequest,  options).toPromise();
    }

    /**
     * Logout the user
     * @param param the request object
     */
    public logoutWithHttpInfo(param: AuthApiLogoutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<LogoutResponse>> {
        return this.api.logoutWithHttpInfo( options).toPromise();
    }

    /**
     * Logout the user
     * @param param the request object
     */
    public logout(param: AuthApiLogoutRequest = {}, options?: ConfigurationOptions): Promise<LogoutResponse> {
        return this.api.logout( options).toPromise();
    }

    /**
     * Verify a Solana wallet signature and authenticate the user
     * @param param the request object
     */
    public verifyWalletSignatureWithHttpInfo(param: AuthApiVerifyWalletSignatureRequest, options?: ConfigurationOptions): Promise<HttpInfo<LoginResponse>> {
        return this.api.verifyWalletSignatureWithHttpInfo(param.verifySignature,  options).toPromise();
    }

    /**
     * Verify a Solana wallet signature and authenticate the user
     * @param param the request object
     */
    public verifyWalletSignature(param: AuthApiVerifyWalletSignatureRequest, options?: ConfigurationOptions): Promise<LoginResponse> {
        return this.api.verifyWalletSignature(param.verifySignature,  options).toPromise();
    }

}

import { ObservableDaosApi } from "./ObservableAPI";
import { DaosApiRequestFactory, DaosApiResponseProcessor} from "../apis/DaosApi";

export interface DaosApiDaosDaoIdAdminsDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdAdminsDelete
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApidaosDaoIdAdminsDelete
     */
    dAOMembership: DAOMembership
}

export interface DaosApiDaosDaoIdAdminsPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdAdminsPost
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApidaosDaoIdAdminsPost
     */
    dAOMembership: DAOMembership
}

export interface DaosApiDaosDaoIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdDelete
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApidaosDaoIdDelete
     */
    dAOMembership: DAOMembership
}

export interface DaosApiDaosDaoIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdGet
     */
    daoId: string
}

export interface DaosApiDaosDaoIdMembersDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdMembersDelete
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApidaosDaoIdMembersDelete
     */
    dAOMembership: DAOMembership
}

export interface DaosApiDaosDaoIdMembersPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdMembersPost
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApidaosDaoIdMembersPost
     */
    dAOMembership: DAOMembership
}

export interface DaosApiDaosDaoIdPodsGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsGet
     */
    daoId: string
    /**
     * 
     * @type PODUserWhoMadeRequest
     * @memberof DaosApidaosDaoIdPodsGet
     */
    pODUserWhoMadeRequest: PODUserWhoMadeRequest
}

export interface DaosApiDaosDaoIdPodsPodIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdDelete
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdDelete
     */
    podId: string
    /**
     * 
     * @type PODMembership
     * @memberof DaosApidaosDaoIdPodsPodIdDelete
     */
    pODMembership: PODMembership
}

export interface DaosApiDaosDaoIdPodsPodIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdGet
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdGet
     */
    podId: string
}

export interface DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersDelete
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersDelete
     */
    podId: string
    /**
     * 
     * @type PODMembership
     * @memberof DaosApidaosDaoIdPodsPodIdMembersDelete
     */
    pODMembership: PODMembership
}

export interface DaosApiDaosDaoIdPodsPodIdMembersGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersGet
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersGet
     */
    podId: string
}

export interface DaosApiDaosDaoIdPodsPodIdMembersPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersPost
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdMembersPost
     */
    podId: string
    /**
     * 
     * @type PODMembership
     * @memberof DaosApidaosDaoIdPodsPodIdMembersPost
     */
    pODMembership: PODMembership
}

export interface DaosApiDaosDaoIdPodsPodIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdPut
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPodIdPut
     */
    podId: string
    /**
     * 
     * @type PODUpdate
     * @memberof DaosApidaosDaoIdPodsPodIdPut
     */
    pODUpdate: PODUpdate
}

export interface DaosApiDaosDaoIdPodsPostRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPodsPost
     */
    daoId: string
    /**
     * 
     * @type POD
     * @memberof DaosApidaosDaoIdPodsPost
     */
    POD: POD
}

export interface DaosApiDaosDaoIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoIdPut
     */
    daoId: string
    /**
     * 
     * @type DAOUpdate
     * @memberof DaosApidaosDaoIdPut
     */
    dAOUpdate: DAOUpdate
}

export interface DaosApiDaosDaoNameGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApidaosDaoNameGet
     */
    daoName: string
}

export interface DaosApiDaosGetRequest {
}

export interface DaosApiDaosPostRequest {
    /**
     * 
     * @type DAO
     * @memberof DaosApidaosPost
     */
    DAO: DAO
}

export class ObjectDaosApi {
    private api: ObservableDaosApi

    public constructor(configuration: Configuration, requestFactory?: DaosApiRequestFactory, responseProcessor?: DaosApiResponseProcessor) {
        this.api = new ObservableDaosApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Remove an admin from a DAO
     * @param param the request object
     */
    public daosDaoIdAdminsDeleteWithHttpInfo(param: DaosApiDaosDaoIdAdminsDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdAdminsDeleteWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param param the request object
     */
    public daosDaoIdAdminsDelete(param: DaosApiDaosDaoIdAdminsDeleteRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdAdminsDelete(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param param the request object
     */
    public daosDaoIdAdminsPostWithHttpInfo(param: DaosApiDaosDaoIdAdminsPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdAdminsPostWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param param the request object
     */
    public daosDaoIdAdminsPost(param: DaosApiDaosDaoIdAdminsPostRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdAdminsPost(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Delete a DAO
     * @param param the request object
     */
    public daosDaoIdDeleteWithHttpInfo(param: DaosApiDaosDaoIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.daosDaoIdDeleteWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Delete a DAO
     * @param param the request object
     */
    public daosDaoIdDelete(param: DaosApiDaosDaoIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.daosDaoIdDelete(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Get a DAO by ID
     * @param param the request object
     */
    public daosDaoIdGetWithHttpInfo(param: DaosApiDaosDaoIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdGetWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get a DAO by ID
     * @param param the request object
     */
    public daosDaoIdGet(param: DaosApiDaosDaoIdGetRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdGet(param.daoId,  options).toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param param the request object
     */
    public daosDaoIdMembersDeleteWithHttpInfo(param: DaosApiDaosDaoIdMembersDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdMembersDeleteWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param param the request object
     */
    public daosDaoIdMembersDelete(param: DaosApiDaosDaoIdMembersDeleteRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdMembersDelete(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add a member to a DAO
     * @param param the request object
     */
    public daosDaoIdMembersPostWithHttpInfo(param: DaosApiDaosDaoIdMembersPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdMembersPostWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add a member to a DAO
     * @param param the request object
     */
    public daosDaoIdMembersPost(param: DaosApiDaosDaoIdMembersPostRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdMembersPost(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param param the request object
     */
    public daosDaoIdPodsGetWithHttpInfo(param: DaosApiDaosDaoIdPodsGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<POD>>> {
        return this.api.daosDaoIdPodsGetWithHttpInfo(param.daoId, param.pODUserWhoMadeRequest,  options).toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param param the request object
     */
    public daosDaoIdPodsGet(param: DaosApiDaosDaoIdPodsGetRequest, options?: ConfigurationOptions): Promise<Array<POD>> {
        return this.api.daosDaoIdPodsGet(param.daoId, param.pODUserWhoMadeRequest,  options).toPromise();
    }

    /**
     * Delete a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdDeleteWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPodIdDeleteWithHttpInfo(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Delete a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdDelete(param: DaosApiDaosDaoIdPodsPodIdDeleteRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPodIdDelete(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Get a POD by ID
     * @param param the request object
     */
    public daosDaoIdPodsPodIdGetWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPodIdGetWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Get a POD by ID
     * @param param the request object
     */
    public daosDaoIdPodsPodIdGet(param: DaosApiDaosDaoIdPodsPodIdGetRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPodIdGet(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Remove a member from a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersDeleteWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPodIdMembersDeleteWithHttpInfo(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Remove a member from a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersDelete(param: DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPodIdMembersDelete(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Get all members of a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersGetWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdMembersGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        return this.api.daosDaoIdPodsPodIdMembersGetWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Get all members of a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersGet(param: DaosApiDaosDaoIdPodsPodIdMembersGetRequest, options?: ConfigurationOptions): Promise<Array<User>> {
        return this.api.daosDaoIdPodsPodIdMembersGet(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Add a member to a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersPostWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdMembersPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPodIdMembersPostWithHttpInfo(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Add a member to a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdMembersPost(param: DaosApiDaosDaoIdPodsPodIdMembersPostRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPodIdMembersPost(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Update a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdPutWithHttpInfo(param: DaosApiDaosDaoIdPodsPodIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPodIdPutWithHttpInfo(param.daoId, param.podId, param.pODUpdate,  options).toPromise();
    }

    /**
     * Update a POD
     * @param param the request object
     */
    public daosDaoIdPodsPodIdPut(param: DaosApiDaosDaoIdPodsPodIdPutRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPodIdPut(param.daoId, param.podId, param.pODUpdate,  options).toPromise();
    }

    /**
     * Create a new POD
     * @param param the request object
     */
    public daosDaoIdPodsPostWithHttpInfo(param: DaosApiDaosDaoIdPodsPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.daosDaoIdPodsPostWithHttpInfo(param.daoId, param.POD,  options).toPromise();
    }

    /**
     * Create a new POD
     * @param param the request object
     */
    public daosDaoIdPodsPost(param: DaosApiDaosDaoIdPodsPostRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.daosDaoIdPodsPost(param.daoId, param.POD,  options).toPromise();
    }

    /**
     * Update a DAO
     * @param param the request object
     */
    public daosDaoIdPutWithHttpInfo(param: DaosApiDaosDaoIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoIdPutWithHttpInfo(param.daoId, param.dAOUpdate,  options).toPromise();
    }

    /**
     * Update a DAO
     * @param param the request object
     */
    public daosDaoIdPut(param: DaosApiDaosDaoIdPutRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoIdPut(param.daoId, param.dAOUpdate,  options).toPromise();
    }

    /**
     * Get a DAO by name
     * @param param the request object
     */
    public daosDaoNameGetWithHttpInfo(param: DaosApiDaosDaoNameGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosDaoNameGetWithHttpInfo(param.daoName,  options).toPromise();
    }

    /**
     * Get a DAO by name
     * @param param the request object
     */
    public daosDaoNameGet(param: DaosApiDaosDaoNameGetRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosDaoNameGet(param.daoName,  options).toPromise();
    }

    /**
     * List all DAOs
     * @param param the request object
     */
    public daosGetWithHttpInfo(param: DaosApiDaosGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<DAO>>> {
        return this.api.daosGetWithHttpInfo( options).toPromise();
    }

    /**
     * List all DAOs
     * @param param the request object
     */
    public daosGet(param: DaosApiDaosGetRequest = {}, options?: ConfigurationOptions): Promise<Array<DAO>> {
        return this.api.daosGet( options).toPromise();
    }

    /**
     * Create a new DAO
     * @param param the request object
     */
    public daosPostWithHttpInfo(param: DaosApiDaosPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.daosPostWithHttpInfo(param.DAO,  options).toPromise();
    }

    /**
     * Create a new DAO
     * @param param the request object
     */
    public daosPost(param: DaosApiDaosPostRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.daosPost(param.DAO,  options).toPromise();
    }

}

import { ObservableDataApi } from "./ObservableAPI";
import { DataApiRequestFactory, DataApiResponseProcessor} from "../apis/DataApi";

export interface DataApiGetItemsRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetItems
     */
    dateStart: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetItems
     */
    dateEnd: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetItems
     */
    source?: string
}

export interface DataApiGetSummaryRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetSummary
     */
    dateStart: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetSummary
     */
    dateEnd: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DataApigetSummary
     */
    source?: string
}

export class ObjectDataApi {
    private api: ObservableDataApi

    public constructor(configuration: Configuration, requestFactory?: DataApiRequestFactory, responseProcessor?: DataApiResponseProcessor) {
        this.api = new ObservableDataApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get data
     * @param param the request object
     */
    public getItemsWithHttpInfo(param: DataApiGetItemsRequest, options?: ConfigurationOptions): Promise<HttpInfo<ItemsResponse>> {
        return this.api.getItemsWithHttpInfo(param.dateStart, param.dateEnd, param.source,  options).toPromise();
    }

    /**
     * Get data
     * @param param the request object
     */
    public getItems(param: DataApiGetItemsRequest, options?: ConfigurationOptions): Promise<ItemsResponse> {
        return this.api.getItems(param.dateStart, param.dateEnd, param.source,  options).toPromise();
    }

    /**
     * Get data
     * @param param the request object
     */
    public getSummaryWithHttpInfo(param: DataApiGetSummaryRequest, options?: ConfigurationOptions): Promise<HttpInfo<SummaryResponse>> {
        return this.api.getSummaryWithHttpInfo(param.dateStart, param.dateEnd, param.source,  options).toPromise();
    }

    /**
     * Get data
     * @param param the request object
     */
    public getSummary(param: DataApiGetSummaryRequest, options?: ConfigurationOptions): Promise<SummaryResponse> {
        return this.api.getSummary(param.dateStart, param.dateEnd, param.source,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiCreateUserRequest {
    /**
     * 
     * @type InputCreateUser
     * @memberof UsersApicreateUser
     */
    inputCreateUser: InputCreateUser
}

export interface UsersApiGetAuthUserInfosRequest {
}

export interface UsersApiGetUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetUser
     */
    userId: string
}

export interface UsersApiGetUserWithWalletAddressRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetUserWithWalletAddress
     */
    walletAddress: string
}

export interface UsersApiUpdateUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiupdateUser
     */
    userId: string
    /**
     * 
     * @type InputUpdateUser
     * @memberof UsersApiupdateUser
     */
    inputUpdateUser: InputUpdateUser
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new user
     * @param param the request object
     */
    public createUserWithHttpInfo(param: UsersApiCreateUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        return this.api.createUserWithHttpInfo(param.inputCreateUser,  options).toPromise();
    }

    /**
     * Create a new user
     * @param param the request object
     */
    public createUser(param: UsersApiCreateUserRequest, options?: ConfigurationOptions): Promise<UserResponse> {
        return this.api.createUser(param.inputCreateUser,  options).toPromise();
    }

    /**
     * Get authenticated user informations
     * @param param the request object
     */
    public getAuthUserInfosWithHttpInfo(param: UsersApiGetAuthUserInfosRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        return this.api.getAuthUserInfosWithHttpInfo( options).toPromise();
    }

    /**
     * Get authenticated user informations
     * @param param the request object
     */
    public getAuthUserInfos(param: UsersApiGetAuthUserInfosRequest = {}, options?: ConfigurationOptions): Promise<UserResponse> {
        return this.api.getAuthUserInfos( options).toPromise();
    }

    /**
     * Get an existing user
     * @param param the request object
     */
    public getUserWithHttpInfo(param: UsersApiGetUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        return this.api.getUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get an existing user
     * @param param the request object
     */
    public getUser(param: UsersApiGetUserRequest, options?: ConfigurationOptions): Promise<UserResponse> {
        return this.api.getUser(param.userId,  options).toPromise();
    }

    /**
     * Check if user with the wallet address exists
     * @param param the request object
     */
    public getUserWithWalletAddressWithHttpInfo(param: UsersApiGetUserWithWalletAddressRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserExistResponse>> {
        return this.api.getUserWithWalletAddressWithHttpInfo(param.walletAddress,  options).toPromise();
    }

    /**
     * Check if user with the wallet address exists
     * @param param the request object
     */
    public getUserWithWalletAddress(param: UsersApiGetUserWithWalletAddressRequest, options?: ConfigurationOptions): Promise<UserExistResponse> {
        return this.api.getUserWithWalletAddress(param.walletAddress,  options).toPromise();
    }

    /**
     * Update an existing user
     * @param param the request object
     */
    public updateUserWithHttpInfo(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        return this.api.updateUserWithHttpInfo(param.userId, param.inputUpdateUser,  options).toPromise();
    }

    /**
     * Update an existing user
     * @param param the request object
     */
    public updateUser(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<UserResponse> {
        return this.api.updateUser(param.userId, param.inputUpdateUser,  options).toPromise();
    }

}
