import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { ChallengeRequest } from '../models/ChallengeRequest';
import { ChallengeResponse } from '../models/ChallengeResponse';
import { DAO } from '../models/DAO';
import { DAOMembership } from '../models/DAOMembership';
import { DAOMembershipResponse } from '../models/DAOMembershipResponse';
import { DAOSchemaResponse } from '../models/DAOSchemaResponse';
import { DAOUpdate } from '../models/DAOUpdate';
import { InputCreateDAO } from '../models/InputCreateDAO';
import { InputCreatePOD } from '../models/InputCreatePOD';
import { InputCreateUser } from '../models/InputCreateUser';
import { InputUpdateUser } from '../models/InputUpdateUser';
import { LoginResponse } from '../models/LoginResponse';
import { LogoutResponse } from '../models/LogoutResponse';
import { ModelError } from '../models/ModelError';
import { POD } from '../models/POD';
import { PODMembership } from '../models/PODMembership';
import { PODMembershipResponse } from '../models/PODMembershipResponse';
import { PODSchemaResponse } from '../models/PODSchemaResponse';
import { PODUpdate } from '../models/PODUpdate';
import { PaginationMetadata } from '../models/PaginationMetadata';
import { PagingError } from '../models/PagingError';
import { Token } from '../models/Token';
import { TokenCreate } from '../models/TokenCreate';
import { TokenSchemaResponse } from '../models/TokenSchemaResponse';
import { Transfer } from '../models/Transfer';
import { TransferCreate } from '../models/TransferCreate';
import { TransferSchemaResponse } from '../models/TransferSchemaResponse';
import { Treasury } from '../models/Treasury';
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

export interface DaosApiAddAdminToDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiaddAdminToDAO
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApiaddAdminToDAO
     */
    dAOMembership: DAOMembership
}

export interface DaosApiAddMemberToDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiaddMemberToDAO
     */
    daoId: string
}

export interface DaosApiAddMemberToPODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiaddMemberToPOD
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiaddMemberToPOD
     */
    podId: string
}

export interface DaosApiCreateDAORequest {
    /**
     * 
     * @type InputCreateDAO
     * @memberof DaosApicreateDAO
     */
    inputCreateDAO: InputCreateDAO
}

export interface DaosApiCreatePODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApicreatePOD
     */
    daoId: string
    /**
     * 
     * @type InputCreatePOD
     * @memberof DaosApicreatePOD
     */
    inputCreatePOD: InputCreatePOD
}

export interface DaosApiDeleteDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApideleteDAO
     */
    daoId: string
}

export interface DaosApiDeletePODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApideletePOD
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApideletePOD
     */
    podId: string
}

export interface DaosApiGetAllDAOsRequest {
}

export interface DaosApiGetAllMembersOfPODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetAllMembersOfPOD
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetAllMembersOfPOD
     */
    podId: string
}

export interface DaosApiGetAllPODsForDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetAllPODsForDAO
     */
    daoId: string
}

export interface DaosApiGetDAOByIdRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetDAOById
     */
    daoId: string
}

export interface DaosApiGetPODByIdRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetPODById
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApigetPODById
     */
    podId: string
}

export interface DaosApiRemoveAdminFromDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiremoveAdminFromDAO
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApiremoveAdminFromDAO
     */
    dAOMembership: DAOMembership
}

export interface DaosApiRemoveMemberFromDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiremoveMemberFromDAO
     */
    daoId: string
    /**
     * 
     * @type DAOMembership
     * @memberof DaosApiremoveMemberFromDAO
     */
    dAOMembership: DAOMembership
}

export interface DaosApiRemoveMemberFromPODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiremoveMemberFromPOD
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiremoveMemberFromPOD
     */
    podId: string
    /**
     * 
     * @type PODMembership
     * @memberof DaosApiremoveMemberFromPOD
     */
    pODMembership: PODMembership
}

export interface DaosApiUpdateDAORequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiupdateDAO
     */
    daoId: string
    /**
     * 
     * @type DAOUpdate
     * @memberof DaosApiupdateDAO
     */
    dAOUpdate: DAOUpdate
}

export interface DaosApiUpdatePODRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiupdatePOD
     */
    daoId: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DaosApiupdatePOD
     */
    podId: string
    /**
     * 
     * @type PODUpdate
     * @memberof DaosApiupdatePOD
     */
    pODUpdate: PODUpdate
}

export class ObjectDaosApi {
    private api: ObservableDaosApi

    public constructor(configuration: Configuration, requestFactory?: DaosApiRequestFactory, responseProcessor?: DaosApiResponseProcessor) {
        this.api = new ObservableDaosApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add an admin to a DAO
     * @param param the request object
     */
    public addAdminToDAOWithHttpInfo(param: DaosApiAddAdminToDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
        return this.api.addAdminToDAOWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add an admin to a DAO
     * @param param the request object
     */
    public addAdminToDAO(param: DaosApiAddAdminToDAORequest, options?: ConfigurationOptions): Promise<DAOMembershipResponse> {
        return this.api.addAdminToDAO(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Add a member to a DAO
     * @param param the request object
     */
    public addMemberToDAOWithHttpInfo(param: DaosApiAddMemberToDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
        return this.api.addMemberToDAOWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Add a member to a DAO
     * @param param the request object
     */
    public addMemberToDAO(param: DaosApiAddMemberToDAORequest, options?: ConfigurationOptions): Promise<DAOMembershipResponse> {
        return this.api.addMemberToDAO(param.daoId,  options).toPromise();
    }

    /**
     * Add a member to a POD
     * @param param the request object
     */
    public addMemberToPODWithHttpInfo(param: DaosApiAddMemberToPODRequest, options?: ConfigurationOptions): Promise<HttpInfo<PODMembershipResponse>> {
        return this.api.addMemberToPODWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Add a member to a POD
     * @param param the request object
     */
    public addMemberToPOD(param: DaosApiAddMemberToPODRequest, options?: ConfigurationOptions): Promise<PODMembershipResponse> {
        return this.api.addMemberToPOD(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Create a new DAO
     * @param param the request object
     */
    public createDAOWithHttpInfo(param: DaosApiCreateDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
        return this.api.createDAOWithHttpInfo(param.inputCreateDAO,  options).toPromise();
    }

    /**
     * Create a new DAO
     * @param param the request object
     */
    public createDAO(param: DaosApiCreateDAORequest, options?: ConfigurationOptions): Promise<DAOSchemaResponse> {
        return this.api.createDAO(param.inputCreateDAO,  options).toPromise();
    }

    /**
     * Create a new POD
     * @param param the request object
     */
    public createPODWithHttpInfo(param: DaosApiCreatePODRequest, options?: ConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
        return this.api.createPODWithHttpInfo(param.daoId, param.inputCreatePOD,  options).toPromise();
    }

    /**
     * Create a new POD
     * @param param the request object
     */
    public createPOD(param: DaosApiCreatePODRequest, options?: ConfigurationOptions): Promise<PODSchemaResponse> {
        return this.api.createPOD(param.daoId, param.inputCreatePOD,  options).toPromise();
    }

    /**
     * Delete a DAO
     * @param param the request object
     */
    public deleteDAOWithHttpInfo(param: DaosApiDeleteDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
        return this.api.deleteDAOWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Delete a DAO
     * @param param the request object
     */
    public deleteDAO(param: DaosApiDeleteDAORequest, options?: ConfigurationOptions): Promise<DAOSchemaResponse> {
        return this.api.deleteDAO(param.daoId,  options).toPromise();
    }

    /**
     * Delete a POD
     * @param param the request object
     */
    public deletePODWithHttpInfo(param: DaosApiDeletePODRequest, options?: ConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
        return this.api.deletePODWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Delete a POD
     * @param param the request object
     */
    public deletePOD(param: DaosApiDeletePODRequest, options?: ConfigurationOptions): Promise<PODSchemaResponse> {
        return this.api.deletePOD(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * List all DAOs
     * @param param the request object
     */
    public getAllDAOsWithHttpInfo(param: DaosApiGetAllDAOsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<DAO>>> {
        return this.api.getAllDAOsWithHttpInfo( options).toPromise();
    }

    /**
     * List all DAOs
     * @param param the request object
     */
    public getAllDAOs(param: DaosApiGetAllDAOsRequest = {}, options?: ConfigurationOptions): Promise<Array<DAO>> {
        return this.api.getAllDAOs( options).toPromise();
    }

    /**
     * Get all members of a POD
     * @param param the request object
     */
    public getAllMembersOfPODWithHttpInfo(param: DaosApiGetAllMembersOfPODRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        return this.api.getAllMembersOfPODWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Get all members of a POD
     * @param param the request object
     */
    public getAllMembersOfPOD(param: DaosApiGetAllMembersOfPODRequest, options?: ConfigurationOptions): Promise<Array<User>> {
        return this.api.getAllMembersOfPOD(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param param the request object
     */
    public getAllPODsForDAOWithHttpInfo(param: DaosApiGetAllPODsForDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<POD>>> {
        return this.api.getAllPODsForDAOWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get all PODs for a DAO
     * @param param the request object
     */
    public getAllPODsForDAO(param: DaosApiGetAllPODsForDAORequest, options?: ConfigurationOptions): Promise<Array<POD>> {
        return this.api.getAllPODsForDAO(param.daoId,  options).toPromise();
    }

    /**
     * Get a DAO by ID
     * @param param the request object
     */
    public getDAOByIdWithHttpInfo(param: DaosApiGetDAOByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<DAO>> {
        return this.api.getDAOByIdWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get a DAO by ID
     * @param param the request object
     */
    public getDAOById(param: DaosApiGetDAOByIdRequest, options?: ConfigurationOptions): Promise<DAO> {
        return this.api.getDAOById(param.daoId,  options).toPromise();
    }

    /**
     * Get a POD by ID
     * @param param the request object
     */
    public getPODByIdWithHttpInfo(param: DaosApiGetPODByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<POD>> {
        return this.api.getPODByIdWithHttpInfo(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Get a POD by ID
     * @param param the request object
     */
    public getPODById(param: DaosApiGetPODByIdRequest, options?: ConfigurationOptions): Promise<POD> {
        return this.api.getPODById(param.daoId, param.podId,  options).toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param param the request object
     */
    public removeAdminFromDAOWithHttpInfo(param: DaosApiRemoveAdminFromDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
        return this.api.removeAdminFromDAOWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove an admin from a DAO
     * @param param the request object
     */
    public removeAdminFromDAO(param: DaosApiRemoveAdminFromDAORequest, options?: ConfigurationOptions): Promise<DAOMembershipResponse> {
        return this.api.removeAdminFromDAO(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param param the request object
     */
    public removeMemberFromDAOWithHttpInfo(param: DaosApiRemoveMemberFromDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOMembershipResponse>> {
        return this.api.removeMemberFromDAOWithHttpInfo(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove a member from a DAO
     * @param param the request object
     */
    public removeMemberFromDAO(param: DaosApiRemoveMemberFromDAORequest, options?: ConfigurationOptions): Promise<DAOMembershipResponse> {
        return this.api.removeMemberFromDAO(param.daoId, param.dAOMembership,  options).toPromise();
    }

    /**
     * Remove a member from a POD
     * @param param the request object
     */
    public removeMemberFromPODWithHttpInfo(param: DaosApiRemoveMemberFromPODRequest, options?: ConfigurationOptions): Promise<HttpInfo<PODMembershipResponse>> {
        return this.api.removeMemberFromPODWithHttpInfo(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Remove a member from a POD
     * @param param the request object
     */
    public removeMemberFromPOD(param: DaosApiRemoveMemberFromPODRequest, options?: ConfigurationOptions): Promise<PODMembershipResponse> {
        return this.api.removeMemberFromPOD(param.daoId, param.podId, param.pODMembership,  options).toPromise();
    }

    /**
     * Update a DAO
     * @param param the request object
     */
    public updateDAOWithHttpInfo(param: DaosApiUpdateDAORequest, options?: ConfigurationOptions): Promise<HttpInfo<DAOSchemaResponse>> {
        return this.api.updateDAOWithHttpInfo(param.daoId, param.dAOUpdate,  options).toPromise();
    }

    /**
     * Update a DAO
     * @param param the request object
     */
    public updateDAO(param: DaosApiUpdateDAORequest, options?: ConfigurationOptions): Promise<DAOSchemaResponse> {
        return this.api.updateDAO(param.daoId, param.dAOUpdate,  options).toPromise();
    }

    /**
     * Update a POD
     * @param param the request object
     */
    public updatePODWithHttpInfo(param: DaosApiUpdatePODRequest, options?: ConfigurationOptions): Promise<HttpInfo<PODSchemaResponse>> {
        return this.api.updatePODWithHttpInfo(param.daoId, param.podId, param.pODUpdate,  options).toPromise();
    }

    /**
     * Update a POD
     * @param param the request object
     */
    public updatePOD(param: DaosApiUpdatePODRequest, options?: ConfigurationOptions): Promise<PODSchemaResponse> {
        return this.api.updatePOD(param.daoId, param.podId, param.pODUpdate,  options).toPromise();
    }

}

import { ObservableTreasuryApi } from "./ObservableAPI";
import { TreasuryApiRequestFactory, TreasuryApiResponseProcessor} from "../apis/TreasuryApi";

export interface TreasuryApiCreateDAOTransferRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TreasuryApicreateDAOTransfer
     */
    daoId: string
    /**
     * 
     * @type TransferCreate
     * @memberof TreasuryApicreateDAOTransfer
     */
    transferCreate: TransferCreate
}

export interface TreasuryApiCreateTokenRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TreasuryApicreateToken
     */
    daoId: string
    /**
     * 
     * @type TokenCreate
     * @memberof TreasuryApicreateToken
     */
    tokenCreate: TokenCreate
}

export interface TreasuryApiGetDAOTokensRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TreasuryApigetDAOTokens
     */
    daoId: string
}

export interface TreasuryApiGetDAOTransfersRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TreasuryApigetDAOTransfers
     */
    daoId: string
}

export interface TreasuryApiGetDAOTreasuryRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TreasuryApigetDAOTreasury
     */
    daoId: string
}

export class ObjectTreasuryApi {
    private api: ObservableTreasuryApi

    public constructor(configuration: Configuration, requestFactory?: TreasuryApiRequestFactory, responseProcessor?: TreasuryApiResponseProcessor) {
        this.api = new ObservableTreasuryApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new transfer for a specific DAO
     * @param param the request object
     */
    public createDAOTransferWithHttpInfo(param: TreasuryApiCreateDAOTransferRequest, options?: ConfigurationOptions): Promise<HttpInfo<TransferSchemaResponse>> {
        return this.api.createDAOTransferWithHttpInfo(param.daoId, param.transferCreate,  options).toPromise();
    }

    /**
     * Create a new transfer for a specific DAO
     * @param param the request object
     */
    public createDAOTransfer(param: TreasuryApiCreateDAOTransferRequest, options?: ConfigurationOptions): Promise<TransferSchemaResponse> {
        return this.api.createDAOTransfer(param.daoId, param.transferCreate,  options).toPromise();
    }

    /**
     * Create a new token for a specific DAO
     * @param param the request object
     */
    public createTokenWithHttpInfo(param: TreasuryApiCreateTokenRequest, options?: ConfigurationOptions): Promise<HttpInfo<TokenSchemaResponse>> {
        return this.api.createTokenWithHttpInfo(param.daoId, param.tokenCreate,  options).toPromise();
    }

    /**
     * Create a new token for a specific DAO
     * @param param the request object
     */
    public createToken(param: TreasuryApiCreateTokenRequest, options?: ConfigurationOptions): Promise<TokenSchemaResponse> {
        return this.api.createToken(param.daoId, param.tokenCreate,  options).toPromise();
    }

    /**
     * Get all tokens for a specific DAO
     * @param param the request object
     */
    public getDAOTokensWithHttpInfo(param: TreasuryApiGetDAOTokensRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Token>>> {
        return this.api.getDAOTokensWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get all tokens for a specific DAO
     * @param param the request object
     */
    public getDAOTokens(param: TreasuryApiGetDAOTokensRequest, options?: ConfigurationOptions): Promise<Array<Token>> {
        return this.api.getDAOTokens(param.daoId,  options).toPromise();
    }

    /**
     * Get all transfers for a specific DAO
     * @param param the request object
     */
    public getDAOTransfersWithHttpInfo(param: TreasuryApiGetDAOTransfersRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Transfer>>> {
        return this.api.getDAOTransfersWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get all transfers for a specific DAO
     * @param param the request object
     */
    public getDAOTransfers(param: TreasuryApiGetDAOTransfersRequest, options?: ConfigurationOptions): Promise<Array<Transfer>> {
        return this.api.getDAOTransfers(param.daoId,  options).toPromise();
    }

    /**
     * Get Treasury information for a specific DAO
     * @param param the request object
     */
    public getDAOTreasuryWithHttpInfo(param: TreasuryApiGetDAOTreasuryRequest, options?: ConfigurationOptions): Promise<HttpInfo<Treasury>> {
        return this.api.getDAOTreasuryWithHttpInfo(param.daoId,  options).toPromise();
    }

    /**
     * Get Treasury information for a specific DAO
     * @param param the request object
     */
    public getDAOTreasury(param: TreasuryApiGetDAOTreasuryRequest, options?: ConfigurationOptions): Promise<Treasury> {
        return this.api.getDAOTreasury(param.daoId,  options).toPromise();
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
    public getAuthUserInfosWithHttpInfo(param: UsersApiGetAuthUserInfosRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.getAuthUserInfosWithHttpInfo( options).toPromise();
    }

    /**
     * Get authenticated user informations
     * @param param the request object
     */
    public getAuthUserInfos(param: UsersApiGetAuthUserInfosRequest = {}, options?: ConfigurationOptions): Promise<User> {
        return this.api.getAuthUserInfos( options).toPromise();
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
