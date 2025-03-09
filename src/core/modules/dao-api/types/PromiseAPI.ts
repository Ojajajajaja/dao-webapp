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
     * Add an admin to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public addAdminToDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.addAdminToDAOWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param daoId
     * @param dAOMembership
     */
    public addAdminToDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.addAdminToDAO(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a DAO
     * @param daoId
     */
    public addMemberToDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.addMemberToDAOWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a DAO
     * @param daoId
     */
    public addMemberToDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.addMemberToDAO(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a POD
     * @param daoId
     * @param podId
     */
    public addMemberToPODWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.addMemberToPODWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Add a member to a POD
     * @param daoId
     * @param podId
     */
    public addMemberToPOD(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.addMemberToPOD(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new DAO
     * @param DAO
     */
    public createDAOWithHttpInfo(DAO: DAO, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.createDAOWithHttpInfo(DAO, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new DAO
     * @param DAO
     */
    public createDAO(DAO: DAO, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.createDAO(DAO, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param POD
     */
    public createPODWithHttpInfo(daoId: string, POD: POD, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.createPODWithHttpInfo(daoId, POD, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param POD
     */
    public createPOD(daoId: string, POD: POD, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.createPOD(daoId, POD, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a DAO
     * @param daoId
     */
    public deleteDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
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
        const result = this.api.deleteDAOWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a DAO
     * @param daoId
     */
    public deleteDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<void> {
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
        const result = this.api.deleteDAO(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a POD
     * @param daoId
     * @param podId
     */
    public deletePODWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.deletePODWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a POD
     * @param daoId
     * @param podId
     */
    public deletePOD(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.deletePOD(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * List all DAOs
     */
    public getAllDAOsWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<DAO>>> {
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
        const result = this.api.getAllDAOsWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * List all DAOs
     */
    public getAllDAOs(_options?: PromiseConfigurationOptions): Promise<Array<DAO>> {
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
        const result = this.api.getAllDAOs(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all members of a POD
     * @param daoId
     * @param podId
     */
    public getAllMembersOfPODWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<User>>> {
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
        const result = this.api.getAllMembersOfPODWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all members of a POD
     * @param daoId
     * @param podId
     */
    public getAllMembersOfPOD(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<Array<User>> {
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
        const result = this.api.getAllMembersOfPOD(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param daoId
     */
    public getAllPODsForDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<POD>>> {
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
        const result = this.api.getAllPODsForDAOWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param daoId
     */
    public getAllPODsForDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<Array<POD>> {
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
        const result = this.api.getAllPODsForDAO(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by ID
     * @param daoId
     */
    public getDAOByIdWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.getDAOByIdWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a DAO by ID
     * @param daoId
     */
    public getDAOById(daoId: string, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.getDAOById(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a POD by ID
     * @param daoId
     * @param podId
     */
    public getPODByIdWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.getPODByIdWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a POD by ID
     * @param daoId
     * @param podId
     */
    public getPODById(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.getPODById(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public removeAdminFromDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.removeAdminFromDAOWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public removeAdminFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.removeAdminFromDAO(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public removeMemberFromDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.removeMemberFromDAOWithHttpInfo(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public removeMemberFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.removeMemberFromDAO(daoId, dAOMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public removeMemberFromPODWithHttpInfo(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.removeMemberFromPODWithHttpInfo(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove a member from a POD
     * @param daoId
     * @param podId
     * @param pODMembership
     */
    public removeMemberFromPOD(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.removeMemberFromPOD(daoId, podId, pODMembership, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a DAO
     * @param daoId
     * @param dAOUpdate
     */
    public updateDAOWithHttpInfo(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAO>> {
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
        const result = this.api.updateDAOWithHttpInfo(daoId, dAOUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a DAO
     * @param daoId
     * @param dAOUpdate
     */
    public updateDAO(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<DAO> {
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
        const result = this.api.updateDAO(daoId, dAOUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a POD
     * @param daoId
     * @param podId
     * @param pODUpdate
     */
    public updatePODWithHttpInfo(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<POD>> {
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
        const result = this.api.updatePODWithHttpInfo(daoId, podId, pODUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a POD
     * @param daoId
     * @param podId
     * @param pODUpdate
     */
    public updatePOD(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<POD> {
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
        const result = this.api.updatePOD(daoId, podId, pODUpdate, observableOptions);
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



