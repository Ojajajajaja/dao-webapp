import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, PromiseConfigurationOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Generate a challenge message for Solana wallet signature authentication
     * @param challengeRequest
     */
    public getWalletChallengeWithHttpInfo(challengeRequest: ChallengeRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ChallengeResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getWalletChallengeWithHttpInfo(challengeRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Generate a challenge message for Solana wallet signature authentication
     * @param challengeRequest
     */
    public getWalletChallenge(challengeRequest: ChallengeRequest, _options?: PromiseConfigurationOptions): Promise<ChallengeResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getWalletChallenge(challengeRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Logout the user
     */
    public logoutWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<LogoutResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.logoutWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Logout the user
     */
    public logout(_options?: PromiseConfigurationOptions): Promise<LogoutResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.logout(observableOptions);
        return result.toPromise();
    }

    /**
     * Verify a Solana wallet signature and authenticate the user
     * @param verifySignature
     */
    public verifyWalletSignatureWithHttpInfo(verifySignature: VerifySignature, _options?: PromiseConfigurationOptions): Promise<HttpInfo<LoginResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.verifyWalletSignatureWithHttpInfo(verifySignature, observableOptions);
        return result.toPromise();
    }

    /**
     * Verify a Solana wallet signature and authenticate the user
     * @param verifySignature
     */
    public verifyWalletSignature(verifySignature: VerifySignature, _options?: PromiseConfigurationOptions): Promise<LoginResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.verifyWalletSignature(verifySignature, observableOptions);
        return result.toPromise();
    }


}



import { ObservableDaosApi } from './ObservableAPI';

import { DaosApiRequestFactory, DaosApiResponseProcessor} from "../apis/DaosApi";
export class PromiseDaosApi {
    private api: ObservableDaosApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DaosApiRequestFactory,
        responseProcessor?: DaosApiResponseProcessor
    ) {
        this.api = new ObservableDaosApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Remove an admin from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdAdminsDeleteWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdAdminsDeleteWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdAdminsDelete(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdAdminsDelete(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdAdminsPostWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdAdminsPostWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdAdminsPost(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdAdminsPost(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdDeleteWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdDeleteWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdDelete(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<void> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdDelete(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by ID
     * @param daoId
     */
    public daosDaoIdGetWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdGetWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by ID
     * @param daoId
     */
    public daosDaoIdGet(daoId: string, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdGet(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdMembersDeleteWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdMembersDeleteWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdMembersDelete(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdMembersDelete(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdMembersPostWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdMembersPostWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public daosDaoIdMembersPost(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdMembersPost(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param daoId
     * @param pODUserWhoMadeRequest
     */
    public daosDaoIdPodsGetWithHttpInfo(daoId: string, pODUserWhoMadeRequest: PODUserWhoMadeRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<POD>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsGetWithHttpInfo(daoId, pODUserWhoMadeRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param daoId
     * @param pODUserWhoMadeRequest
     */
    public daosDaoIdPodsGet(daoId: string, pODUserWhoMadeRequest: PODUserWhoMadeRequest, _options?: PromiseConfigurationOptions): Promise<Array<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsGet(daoId, pODUserWhoMadeRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdDeleteWithHttpInfo(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdDeleteWithHttpInfo(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdDelete(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdDelete(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a POD by ID
     * @param daoId
     * @param podId
     */
    public daosDaoIdPodsPodIdGetWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdGetWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a POD by ID
     * @param daoId
     * @param podId
     */
    public daosDaoIdPodsPodIdGet(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdGet(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdMembersDeleteWithHttpInfo(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersDeleteWithHttpInfo(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdMembersDelete(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersDelete(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all members of a POD
     * @param daoId
     * @param podId
     */
    public daosDaoIdPodsPodIdMembersGetWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersGetWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all members of a POD
     * @param daoId
     * @param podId
     */
    public daosDaoIdPodsPodIdMembersGet(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<Array<User>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersGet(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdMembersPostWithHttpInfo(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersPostWithHttpInfo(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public daosDaoIdPodsPodIdMembersPost(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdMembersPost(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a POD
     * @param daoId
     * @param podId
     * @param pODUpdate
     */
    public daosDaoIdPodsPodIdPutWithHttpInfo(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdPutWithHttpInfo(daoId, podId, pODUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a POD
     * @param daoId
     * @param podId
     * @param pODUpdate
     */
    public daosDaoIdPodsPodIdPut(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPodIdPut(daoId, podId, pODUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param POD
     */
    public daosDaoIdPodsPostWithHttpInfo(daoId: string, POD: POD, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPostWithHttpInfo(daoId, POD, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param POD
     */
    public daosDaoIdPodsPost(daoId: string, POD: POD, _options?: PromiseConfigurationOptions): Promise<POD> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPodsPost(daoId, POD, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a DAO
     * @param daoId
     * @param dAOUpdate
     */
    public daosDaoIdPutWithHttpInfo(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPutWithHttpInfo(daoId, dAOUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a DAO
     * @param daoId
     * @param dAOUpdate
     */
    public daosDaoIdPut(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoIdPut(daoId, dAOUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by name
     * @param daoName
     */
    public daosDaoNameGetWithHttpInfo(daoName: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoNameGetWithHttpInfo(daoName, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by name
     * @param daoName
     */
    public daosDaoNameGet(daoName: string, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosDaoNameGet(daoName, observableOptions);
        return result.toPromise();
    }

    /**
     * List all DAOs
     */
    public daosGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<DAO>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * List all DAOs
     */
    public daosGet(_options?: PromiseConfigurationOptions): Promise<Array<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosGet(observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new DAO
     * @param DAO
     */
    public daosPostWithHttpInfo(DAO: DAO, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosPostWithHttpInfo(DAO, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new DAO
     * @param DAO
     */
    public daosPost(DAO: DAO, _options?: PromiseConfigurationOptions): Promise<DAO> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.daosPost(DAO, observableOptions);
        return result.toPromise();
    }


}



import { ObservableDataApi } from './ObservableAPI';

import { DataApiRequestFactory, DataApiResponseProcessor} from "../apis/DataApi";
export class PromiseDataApi {
    private api: ObservableDataApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DataApiRequestFactory,
        responseProcessor?: DataApiResponseProcessor
    ) {
        this.api = new ObservableDataApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get data
     * @param dateStart
     * @param dateEnd
     * @param [source]
     */
    public getItemsWithHttpInfo(dateStart: string, dateEnd: string, source?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ItemsResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getItemsWithHttpInfo(dateStart, dateEnd, source, observableOptions);
        return result.toPromise();
    }

    /**
     * Get data
     * @param dateStart
     * @param dateEnd
     * @param [source]
     */
    public getItems(dateStart: string, dateEnd: string, source?: string, _options?: PromiseConfigurationOptions): Promise<ItemsResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getItems(dateStart, dateEnd, source, observableOptions);
        return result.toPromise();
    }

    /**
     * Get data
     * @param dateStart
     * @param dateEnd
     * @param [source]
     */
    public getSummaryWithHttpInfo(dateStart: string, dateEnd: string, source?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SummaryResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getSummaryWithHttpInfo(dateStart, dateEnd, source, observableOptions);
        return result.toPromise();
    }

    /**
     * Get data
     * @param dateStart
     * @param dateEnd
     * @param [source]
     */
    public getSummary(dateStart: string, dateEnd: string, source?: string, _options?: PromiseConfigurationOptions): Promise<SummaryResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getSummary(dateStart, dateEnd, source, observableOptions);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new user
     * @param inputCreateUser
     */
    public createUserWithHttpInfo(inputCreateUser: InputCreateUser, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createUserWithHttpInfo(inputCreateUser, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new user
     * @param inputCreateUser
     */
    public createUser(inputCreateUser: InputCreateUser, _options?: PromiseConfigurationOptions): Promise<UserResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createUser(inputCreateUser, observableOptions);
        return result.toPromise();
    }

    /**
     * Get authenticated user informations
     */
    public getAuthUserInfosWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getAuthUserInfosWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get authenticated user informations
     */
    public getAuthUserInfos(_options?: PromiseConfigurationOptions): Promise<UserResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getAuthUserInfos(observableOptions);
        return result.toPromise();
    }

    /**
     * Get an existing user
     * @param userId
     */
    public getUserWithHttpInfo(userId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getUserWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get an existing user
     * @param userId
     */
    public getUser(userId: string, _options?: PromiseConfigurationOptions): Promise<UserResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getUser(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if user with the wallet address exists
     * @param walletAddress
     */
    public getUserWithWalletAddressWithHttpInfo(walletAddress: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserExistResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getUserWithWalletAddressWithHttpInfo(walletAddress, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if user with the wallet address exists
     * @param walletAddress
     */
    public getUserWithWalletAddress(walletAddress: string, _options?: PromiseConfigurationOptions): Promise<UserExistResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.getUserWithWalletAddress(walletAddress, observableOptions);
        return result.toPromise();
    }

    /**
     * Update an existing user
     * @param userId
     * @param inputUpdateUser
     */
    public updateUserWithHttpInfo(userId: string, inputUpdateUser: InputUpdateUser, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUserWithHttpInfo(userId, inputUpdateUser, observableOptions);
        return result.toPromise();
    }

    /**
     * Update an existing user
     * @param userId
     * @param inputUpdateUser
     */
    public updateUser(userId: string, inputUpdateUser: InputUpdateUser, _options?: PromiseConfigurationOptions): Promise<UserResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUser(userId, inputUpdateUser, observableOptions);
        return result.toPromise();
    }


}



