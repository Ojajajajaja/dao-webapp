import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, PromiseConfigurationOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

import { ChallengeRequest } from '../models/ChallengeRequest';
import { ChallengeResponse } from '../models/ChallengeResponse';
import { ConnectionResponse } from '../models/ConnectionResponse';
import { ConnectionsList } from '../models/ConnectionsList';
import { DAO } from '../models/DAO';
import { DAOMembership } from '../models/DAOMembership';
import { DAOMembershipResponse } from '../models/DAOMembershipResponse';
import { DAOSchemaResponse } from '../models/DAOSchemaResponse';
import { DAOUpdate } from '../models/DAOUpdate';
import { DisconnectResponse } from '../models/DisconnectResponse';
import { DiscordChannel } from '../models/DiscordChannel';
import { DiscordChannelResponse } from '../models/DiscordChannelResponse';
import { DiscordChannelsResponse } from '../models/DiscordChannelsResponse';
import { DiscordMessage } from '../models/DiscordMessage';
import { DiscordMessagesResponse } from '../models/DiscordMessagesResponse';
import { InputCreateDAO } from '../models/InputCreateDAO';
import { InputCreatePOD } from '../models/InputCreatePOD';
import { InputCreateProposal } from '../models/InputCreateProposal';
import { InputCreateUser } from '../models/InputCreateUser';
import { InputUpdateUser } from '../models/InputUpdateUser';
import { LinkDiscordChannel } from '../models/LinkDiscordChannel';
import { LoginResponse } from '../models/LoginResponse';
import { LogoutResponse } from '../models/LogoutResponse';
import { ModelError } from '../models/ModelError';
import { OAuthError } from '../models/OAuthError';
import { OAuthResponse } from '../models/OAuthResponse';
import { POD } from '../models/POD';
import { PODMembership } from '../models/PODMembership';
import { PODMembershipResponse } from '../models/PODMembershipResponse';
import { PODSchemaResponse } from '../models/PODSchemaResponse';
import { PODUpdate } from '../models/PODUpdate';
import { PaginationMetadata } from '../models/PaginationMetadata';
import { PagingError } from '../models/PagingError';
import { Proposal } from '../models/Proposal';
import { ProposalSchemaResponse } from '../models/ProposalSchemaResponse';
import { ProposalUpdate } from '../models/ProposalUpdate';
import { ProposalVote } from '../models/ProposalVote';
import { ProposalVoteResponse } from '../models/ProposalVoteResponse';
import { SocialConnection } from '../models/SocialConnection';
import { TelegramAuth } from '../models/TelegramAuth';
import { Token } from '../models/Token';
import { TokenCreate } from '../models/TokenCreate';
import { TokenSchemaResponse } from '../models/TokenSchemaResponse';
import { Transfer } from '../models/Transfer';
import { TransferCreate } from '../models/TransferCreate';
import { TransferSchemaResponse } from '../models/TransferSchemaResponse';
import { Treasury } from '../models/Treasury';
import { TreasuryUpdatePercentages } from '../models/TreasuryUpdatePercentages';
import { User } from '../models/User';
import { UserBasic } from '../models/UserBasic';
import { UserBasic1 } from '../models/UserBasic1';
import { UserExistResponse } from '../models/UserExistResponse';
import { UserInfoError } from '../models/UserInfoError';
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
    public addAdminToDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
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
    public addAdminToDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAOMembershipResponse> {
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
    public addMemberToDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
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
    public addMemberToDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<DAOMembershipResponse> {
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
    public addMemberToPODWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PODMembershipResponse>> {
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
    public addMemberToPOD(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<PODMembershipResponse> {
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
     * @param inputCreateDAO
     */
    public createDAOWithHttpInfo(inputCreateDAO: InputCreateDAO, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
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
        const result = this.api.createDAOWithHttpInfo(inputCreateDAO, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new DAO
     * @param inputCreateDAO
     */
    public createDAO(inputCreateDAO: InputCreateDAO, _options?: PromiseConfigurationOptions): Promise<DAOSchemaResponse> {
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
        const result = this.api.createDAO(inputCreateDAO, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param inputCreatePOD
     */
    public createPODWithHttpInfo(daoId: string, inputCreatePOD: InputCreatePOD, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
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
        const result = this.api.createPODWithHttpInfo(daoId, inputCreatePOD, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new POD
     * @param daoId
     * @param inputCreatePOD
     */
    public createPOD(daoId: string, inputCreatePOD: InputCreatePOD, _options?: PromiseConfigurationOptions): Promise<PODSchemaResponse> {
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
        const result = this.api.createPOD(daoId, inputCreatePOD, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a DAO
     * @param daoId
     */
    public deleteDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
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
    public deleteDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<DAOSchemaResponse> {
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
    public deletePODWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
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
    public deletePOD(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<PODSchemaResponse> {
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
     * Get messages from a specific Discord channel
     * @param daoId
     * @param podId
     * @param channelId
     */
    public getChannelMessagesWithHttpInfo(daoId: string, podId: string, channelId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DiscordMessagesResponse>> {
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
        const result = this.api.getChannelMessagesWithHttpInfo(daoId, podId, channelId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get messages from a specific Discord channel
     * @param daoId
     * @param podId
     * @param channelId
     */
    public getChannelMessages(daoId: string, podId: string, channelId: string, _options?: PromiseConfigurationOptions): Promise<DiscordMessagesResponse> {
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
        const result = this.api.getChannelMessages(daoId, podId, channelId, observableOptions);
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
     * Get all Discord channels for a POD
     * @param daoId
     * @param podId
     */
    public getPODDiscordChannelsWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DiscordChannelsResponse>> {
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
        const result = this.api.getPODDiscordChannelsWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all Discord channels for a POD
     * @param daoId
     * @param podId
     */
    public getPODDiscordChannels(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<DiscordChannelsResponse> {
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
        const result = this.api.getPODDiscordChannels(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get Discord feed for a POD
     * @param daoId
     * @param podId
     */
    public getPODFeedWithHttpInfo(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DiscordMessagesResponse>> {
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
        const result = this.api.getPODFeedWithHttpInfo(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get Discord feed for a POD
     * @param daoId
     * @param podId
     */
    public getPODFeed(daoId: string, podId: string, _options?: PromiseConfigurationOptions): Promise<DiscordMessagesResponse> {
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
        const result = this.api.getPODFeed(daoId, podId, observableOptions);
        return result.toPromise();
    }

    /**
     * Link a Discord channel to a POD
     * @param daoId
     * @param podId
     * @param linkDiscordChannel
     */
    public linkDiscordChannelToPODWithHttpInfo(daoId: string, podId: string, linkDiscordChannel: LinkDiscordChannel, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DiscordChannelResponse>> {
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
        const result = this.api.linkDiscordChannelToPODWithHttpInfo(daoId, podId, linkDiscordChannel, observableOptions);
        return result.toPromise();
    }

    /**
     * Link a Discord channel to a POD
     * @param daoId
     * @param podId
     * @param linkDiscordChannel
     */
    public linkDiscordChannelToPOD(daoId: string, podId: string, linkDiscordChannel: LinkDiscordChannel, _options?: PromiseConfigurationOptions): Promise<DiscordChannelResponse> {
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
        const result = this.api.linkDiscordChannelToPOD(daoId, podId, linkDiscordChannel, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param daoId
     * @param dAOMembership
     */
    public removeAdminFromDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
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
    public removeAdminFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAOMembershipResponse> {
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
    public removeMemberFromDAOWithHttpInfo(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
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
    public removeMemberFromDAO(daoId: string, dAOMembership: DAOMembership, _options?: PromiseConfigurationOptions): Promise<DAOMembershipResponse> {
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
    public removeMemberFromPODWithHttpInfo(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PODMembershipResponse>> {
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
    public removeMemberFromPOD(daoId: string, podId: string, pODMembership: PODMembership, _options?: PromiseConfigurationOptions): Promise<PODMembershipResponse> {
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
     * Unlink a Discord channel from a POD
     * @param daoId
     * @param podId
     * @param channelId
     */
    public unlinkDiscordChannelFromPODWithHttpInfo(daoId: string, podId: string, channelId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DiscordChannelResponse>> {
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
        const result = this.api.unlinkDiscordChannelFromPODWithHttpInfo(daoId, podId, channelId, observableOptions);
        return result.toPromise();
    }

    /**
     * Unlink a Discord channel from a POD
     * @param daoId
     * @param podId
     * @param channelId
     */
    public unlinkDiscordChannelFromPOD(daoId: string, podId: string, channelId: string, _options?: PromiseConfigurationOptions): Promise<DiscordChannelResponse> {
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
        const result = this.api.unlinkDiscordChannelFromPOD(daoId, podId, channelId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a DAO
     * @param daoId
     * @param dAOUpdate
     */
    public updateDAOWithHttpInfo(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
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
    public updateDAO(daoId: string, dAOUpdate: DAOUpdate, _options?: PromiseConfigurationOptions): Promise<DAOSchemaResponse> {
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
    public updatePODWithHttpInfo(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
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
    public updatePOD(daoId: string, podId: string, pODUpdate: PODUpdate, _options?: PromiseConfigurationOptions): Promise<PODSchemaResponse> {
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



import { ObservableDiscordOauthApi } from './ObservableAPI';

import { DiscordOauthApiRequestFactory, DiscordOauthApiResponseProcessor} from "../apis/DiscordOauthApi";
export class PromiseDiscordOauthApi {
    private api: ObservableDiscordOauthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DiscordOauthApiRequestFactory,
        responseProcessor?: DiscordOauthApiResponseProcessor
    ) {
        this.api = new ObservableDiscordOauthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Redirects the user to Discord\'s authorization page to begin the OAuth flow.
     * Initiate Discord OAuth flow
     */
    public connectDiscordWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<OAuthResponse>> {
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
        const result = this.api.connectDiscordWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Redirects the user to Discord\'s authorization page to begin the OAuth flow.
     * Initiate Discord OAuth flow
     */
    public connectDiscord(_options?: PromiseConfigurationOptions): Promise<OAuthResponse> {
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
        const result = this.api.connectDiscord(observableOptions);
        return result.toPromise();
    }

    /**
     * Removes the connection between the user\'s account and their Discord account.
     * Disconnect Discord account
     */
    public disconnectDiscordWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<DisconnectResponse>> {
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
        const result = this.api.disconnectDiscordWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Removes the connection between the user\'s account and their Discord account.
     * Disconnect Discord account
     */
    public disconnectDiscord(_options?: PromiseConfigurationOptions): Promise<DisconnectResponse> {
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
        const result = this.api.disconnectDiscord(observableOptions);
        return result.toPromise();
    }

    /**
     * Processes the callback from Discord after user authorization.
     * Handle Discord OAuth callback
     */
    public discordCallbackWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
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
        const result = this.api.discordCallbackWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Processes the callback from Discord after user authorization.
     * Handle Discord OAuth callback
     */
    public discordCallback(_options?: PromiseConfigurationOptions): Promise<void> {
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
        const result = this.api.discordCallback(observableOptions);
        return result.toPromise();
    }


}



import { ObservableProposalsApi } from './ObservableAPI';

import { ProposalsApiRequestFactory, ProposalsApiResponseProcessor} from "../apis/ProposalsApi";
export class PromiseProposalsApi {
    private api: ObservableProposalsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProposalsApiRequestFactory,
        responseProcessor?: ProposalsApiResponseProcessor
    ) {
        this.api = new ObservableProposalsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new proposal for this specific DAO
     * @param daoId
     * @param inputCreateProposal
     */
    public createProposalForDAOWithHttpInfo(daoId: string, inputCreateProposal: InputCreateProposal, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ProposalSchemaResponse>> {
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
        const result = this.api.createProposalForDAOWithHttpInfo(daoId, inputCreateProposal, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new proposal for this specific DAO
     * @param daoId
     * @param inputCreateProposal
     */
    public createProposalForDAO(daoId: string, inputCreateProposal: InputCreateProposal, _options?: PromiseConfigurationOptions): Promise<ProposalSchemaResponse> {
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
        const result = this.api.createProposalForDAO(daoId, inputCreateProposal, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public deleteDAOProposalWithHttpInfo(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ProposalSchemaResponse>> {
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
        const result = this.api.deleteDAOProposalWithHttpInfo(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public deleteDAOProposal(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<ProposalSchemaResponse> {
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
        const result = this.api.deleteDAOProposal(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all active proposals for a specific DAO
     * @param daoId
     */
    public getActiveProposalsByDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Proposal>>> {
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
        const result = this.api.getActiveProposalsByDAOWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all active proposals for a specific DAO
     * @param daoId
     */
    public getActiveProposalsByDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<Array<Proposal>> {
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
        const result = this.api.getActiveProposalsByDAO(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a specific proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public getDAOProposalByIdWithHttpInfo(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Proposal>> {
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
        const result = this.api.getDAOProposalByIdWithHttpInfo(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a specific proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public getDAOProposalById(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<Proposal> {
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
        const result = this.api.getDAOProposalById(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all proposals for a specific DAO
     * @param daoId
     */
    public getProposalsByDAOWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Proposal>>> {
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
        const result = this.api.getProposalsByDAOWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all proposals for a specific DAO
     * @param daoId
     */
    public getProposalsByDAO(daoId: string, _options?: PromiseConfigurationOptions): Promise<Array<Proposal>> {
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
        const result = this.api.getProposalsByDAO(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove vote from a proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public removeVoteFromDAOProposalWithHttpInfo(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ProposalVoteResponse>> {
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
        const result = this.api.removeVoteFromDAOProposalWithHttpInfo(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove vote from a proposal for a DAO
     * @param daoId
     * @param proposalId
     */
    public removeVoteFromDAOProposal(daoId: string, proposalId: string, _options?: PromiseConfigurationOptions): Promise<ProposalVoteResponse> {
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
        const result = this.api.removeVoteFromDAOProposal(daoId, proposalId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a proposal for a DAO
     * @param daoId
     * @param proposalId
     * @param proposalUpdate
     */
    public updateDAOProposalWithHttpInfo(daoId: string, proposalId: string, proposalUpdate: ProposalUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ProposalSchemaResponse>> {
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
        const result = this.api.updateDAOProposalWithHttpInfo(daoId, proposalId, proposalUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a proposal for a DAO
     * @param daoId
     * @param proposalId
     * @param proposalUpdate
     */
    public updateDAOProposal(daoId: string, proposalId: string, proposalUpdate: ProposalUpdate, _options?: PromiseConfigurationOptions): Promise<ProposalSchemaResponse> {
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
        const result = this.api.updateDAOProposal(daoId, proposalId, proposalUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Vote on a proposal for a DAO
     * @param daoId
     * @param proposalId
     * @param proposalVote
     */
    public voteOnDAOProposalWithHttpInfo(daoId: string, proposalId: string, proposalVote: ProposalVote, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ProposalVoteResponse>> {
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
        const result = this.api.voteOnDAOProposalWithHttpInfo(daoId, proposalId, proposalVote, observableOptions);
        return result.toPromise();
    }

    /**
     * Vote on a proposal for a DAO
     * @param daoId
     * @param proposalId
     * @param proposalVote
     */
    public voteOnDAOProposal(daoId: string, proposalId: string, proposalVote: ProposalVote, _options?: PromiseConfigurationOptions): Promise<ProposalVoteResponse> {
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
        const result = this.api.voteOnDAOProposal(daoId, proposalId, proposalVote, observableOptions);
        return result.toPromise();
    }


}



import { ObservableSocialConnectionsApi } from './ObservableAPI';

import { SocialConnectionsApiRequestFactory, SocialConnectionsApiResponseProcessor} from "../apis/SocialConnectionsApi";
export class PromiseSocialConnectionsApi {
    private api: ObservableSocialConnectionsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SocialConnectionsApiRequestFactory,
        responseProcessor?: SocialConnectionsApiResponseProcessor
    ) {
        this.api = new ObservableSocialConnectionsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns all social connections for the authenticated user.
     * Get user\'s social connections
     */
    public getSocialConnectionsWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<ConnectionsList>> {
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
        const result = this.api.getSocialConnectionsWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Returns all social connections for the authenticated user.
     * Get user\'s social connections
     */
    public getSocialConnections(_options?: PromiseConfigurationOptions): Promise<ConnectionsList> {
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
        const result = this.api.getSocialConnections(observableOptions);
        return result.toPromise();
    }


}



import { ObservableTelegramAuthApi } from './ObservableAPI';

import { TelegramAuthApiRequestFactory, TelegramAuthApiResponseProcessor} from "../apis/TelegramAuthApi";
export class PromiseTelegramAuthApi {
    private api: ObservableTelegramAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TelegramAuthApiRequestFactory,
        responseProcessor?: TelegramAuthApiResponseProcessor
    ) {
        this.api = new ObservableTelegramAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Removes the connection between the user\'s account and their Telegram account.
     * Disconnect Telegram account
     */
    public disconnectTelegramWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<DisconnectResponse>> {
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
        const result = this.api.disconnectTelegramWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Removes the connection between the user\'s account and their Telegram account.
     * Disconnect Telegram account
     */
    public disconnectTelegram(_options?: PromiseConfigurationOptions): Promise<DisconnectResponse> {
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
        const result = this.api.disconnectTelegram(observableOptions);
        return result.toPromise();
    }

    /**
     * Handles the authentication data from the Telegram Login Widget.
     * Process Telegram authentication data
     * @param telegramAuth
     */
    public telegramCallbackWithHttpInfo(telegramAuth: TelegramAuth, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ConnectionResponse>> {
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
        const result = this.api.telegramCallbackWithHttpInfo(telegramAuth, observableOptions);
        return result.toPromise();
    }

    /**
     * Handles the authentication data from the Telegram Login Widget.
     * Process Telegram authentication data
     * @param telegramAuth
     */
    public telegramCallback(telegramAuth: TelegramAuth, _options?: PromiseConfigurationOptions): Promise<ConnectionResponse> {
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
        const result = this.api.telegramCallback(telegramAuth, observableOptions);
        return result.toPromise();
    }


}



import { ObservableTreasuryApi } from './ObservableAPI';

import { TreasuryApiRequestFactory, TreasuryApiResponseProcessor} from "../apis/TreasuryApi";
export class PromiseTreasuryApi {
    private api: ObservableTreasuryApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TreasuryApiRequestFactory,
        responseProcessor?: TreasuryApiResponseProcessor
    ) {
        this.api = new ObservableTreasuryApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new transfer for a specific DAO
     * @param daoId
     * @param transferCreate
     */
    public createDAOTransferWithHttpInfo(daoId: string, transferCreate: TransferCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<TransferSchemaResponse>> {
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
        const result = this.api.createDAOTransferWithHttpInfo(daoId, transferCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new transfer for a specific DAO
     * @param daoId
     * @param transferCreate
     */
    public createDAOTransfer(daoId: string, transferCreate: TransferCreate, _options?: PromiseConfigurationOptions): Promise<TransferSchemaResponse> {
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
        const result = this.api.createDAOTransfer(daoId, transferCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new token for a specific DAO
     * @param daoId
     * @param tokenCreate
     */
    public createTokenWithHttpInfo(daoId: string, tokenCreate: TokenCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<TokenSchemaResponse>> {
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
        const result = this.api.createTokenWithHttpInfo(daoId, tokenCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new token for a specific DAO
     * @param daoId
     * @param tokenCreate
     */
    public createToken(daoId: string, tokenCreate: TokenCreate, _options?: PromiseConfigurationOptions): Promise<TokenSchemaResponse> {
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
        const result = this.api.createToken(daoId, tokenCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all tokens for a specific DAO
     * @param daoId
     */
    public getDAOTokensWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Token>>> {
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
        const result = this.api.getDAOTokensWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all tokens for a specific DAO
     * @param daoId
     */
    public getDAOTokens(daoId: string, _options?: PromiseConfigurationOptions): Promise<Array<Token>> {
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
        const result = this.api.getDAOTokens(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all transfers for a specific DAO
     * @param daoId
     */
    public getDAOTransfersWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Transfer>>> {
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
        const result = this.api.getDAOTransfersWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all transfers for a specific DAO
     * @param daoId
     */
    public getDAOTransfers(daoId: string, _options?: PromiseConfigurationOptions): Promise<Array<Transfer>> {
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
        const result = this.api.getDAOTransfers(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get Treasury information for a specific DAO
     * @param daoId
     */
    public getDAOTreasuryWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Treasury>> {
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
        const result = this.api.getDAOTreasuryWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get Treasury information for a specific DAO
     * @param daoId
     */
    public getDAOTreasury(daoId: string, _options?: PromiseConfigurationOptions): Promise<Treasury> {
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
        const result = this.api.getDAOTreasury(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update the percentages of tokens in the DAO\'s treasury without changing prices
     * @param daoId
     */
    public updateDAOTokenPercentagesWithHttpInfo(daoId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<TreasuryUpdatePercentages>> {
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
        const result = this.api.updateDAOTokenPercentagesWithHttpInfo(daoId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update the percentages of tokens in the DAO\'s treasury without changing prices
     * @param daoId
     */
    public updateDAOTokenPercentages(daoId: string, _options?: PromiseConfigurationOptions): Promise<TreasuryUpdatePercentages> {
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
        const result = this.api.updateDAOTokenPercentages(daoId, observableOptions);
        return result.toPromise();
    }


}



import { ObservableTwitterOauthApi } from './ObservableAPI';

import { TwitterOauthApiRequestFactory, TwitterOauthApiResponseProcessor} from "../apis/TwitterOauthApi";
export class PromiseTwitterOauthApi {
    private api: ObservableTwitterOauthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TwitterOauthApiRequestFactory,
        responseProcessor?: TwitterOauthApiResponseProcessor
    ) {
        this.api = new ObservableTwitterOauthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Redirects the user to Twitter\'s authorization page to begin the OAuth 2.0 PKCE flow.
     * Initiate Twitter OAuth flow
     */
    public connectTwitterWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<OAuthResponse>> {
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
        const result = this.api.connectTwitterWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Redirects the user to Twitter\'s authorization page to begin the OAuth 2.0 PKCE flow.
     * Initiate Twitter OAuth flow
     */
    public connectTwitter(_options?: PromiseConfigurationOptions): Promise<OAuthResponse> {
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
        const result = this.api.connectTwitter(observableOptions);
        return result.toPromise();
    }

    /**
     * Removes the connection between the user\'s account and their Twitter account.
     * Disconnect Twitter account
     */
    public disconnectTwitterWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<DisconnectResponse>> {
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
        const result = this.api.disconnectTwitterWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Removes the connection between the user\'s account and their Twitter account.
     * Disconnect Twitter account
     */
    public disconnectTwitter(_options?: PromiseConfigurationOptions): Promise<DisconnectResponse> {
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
        const result = this.api.disconnectTwitter(observableOptions);
        return result.toPromise();
    }

    /**
     * Processes the callback from Twitter after user authorization.
     * Handle Twitter OAuth callback
     */
    public twitterCallbackWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
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
        const result = this.api.twitterCallbackWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Processes the callback from Twitter after user authorization.
     * Handle Twitter OAuth callback
     */
    public twitterCallback(_options?: PromiseConfigurationOptions): Promise<void> {
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
        const result = this.api.twitterCallback(observableOptions);
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
    public getAuthUserInfosWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
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
    public getAuthUserInfos(_options?: PromiseConfigurationOptions): Promise<User> {
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



