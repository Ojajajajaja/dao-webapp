import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { DAO } from '../models/DAO';
import { DAOMembership } from '../models/DAOMembership';
import { DAOUpdate } from '../models/DAOUpdate';
import { InputCreateUser } from '../models/InputCreateUser';
import { InputUpdateUser } from '../models/InputUpdateUser';
import { Item } from '../models/Item';
import { ItemsResponse } from '../models/ItemsResponse';
import { LoginParams } from '../models/LoginParams';
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

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiLoginRequest {
    /**
     * 
     * @type LoginParams
     * @memberof AuthApilogin
     */
    loginParams: LoginParams
}

export interface AuthApiLogoutRequest {
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Login the user
     * @param param the request object
     */
    public loginWithHttpInfo(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<HttpInfo<LoginResponse>> {
        return this.api.loginWithHttpInfo(param.loginParams,  options).toPromise();
    }

    /**
     * Login the user
     * @param param the request object
     */
    public login(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<LoginResponse> {
        return this.api.login(param.loginParams,  options).toPromise();
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

}

import { ObservableDaosApi } from "./ObservableAPI";
import { DaosApiRequestFactory, DaosApiResponseProcessor} from "../apis/DaosApi";

export interface DaosApiDaosDaoIdAdminsDeleteRequest {
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdAdminsDelete
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdAdminsPost
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdDelete
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdGet
     */
    daoId: number
}

export interface DaosApiDaosDaoIdMembersDeleteRequest {
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdMembersDelete
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdMembersPost
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsGet
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdDelete
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdDelete
     */
    podId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdGet
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdGet
     */
    podId: number
}

export interface DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest {
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersDelete
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersDelete
     */
    podId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersGet
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersGet
     */
    podId: number
}

export interface DaosApiDaosDaoIdPodsPodIdMembersPostRequest {
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersPost
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdMembersPost
     */
    podId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdPut
     */
    daoId: number
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPodIdPut
     */
    podId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPodsPost
     */
    daoId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof DaosApidaosDaoIdPut
     */
    daoId: number
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

export interface UsersApiGetUserRequest {
    /**
     * 
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof UsersApigetUser
     */
    userId: number
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
     * Minimum: 0
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiupdateUser
     */
    userId: number
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
