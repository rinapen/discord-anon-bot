import { BaseClient } from '../client/BaseClient';
import { LoginEmailUserRequest } from '../util/Types';
import { LoginUpdateResponse, LoginUserResponse, TokenResponse } from '../util/Responses';
/**
 * **認証API**
 *
 * @remarks
 * 認証APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class AuthAPI {
    private readonly base;
    constructor(base: BaseClient);
    changeEmail: (options: {
        email: string;
        password: string;
        emailGrantToken?: string;
    }) => Promise<LoginUpdateResponse>;
    changePassword: (options: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<LoginUpdateResponse>;
    getToken: (options: {
        grantType: string;
        email?: string;
        password?: string;
        refreshToken?: string;
    }) => Promise<TokenResponse>;
    loginWithEmail: (request: LoginEmailUserRequest) => Promise<LoginUserResponse>;
    logoutDevice: () => Promise<any>;
    migrateToken: (options: {
        token: string;
    }) => Promise<any>;
    registerDeviceToken: (options: {
        deviceToken: string;
        deviceType: string;
        osVersion: string;
        screenResolution: string;
        screenDensity: string;
        deviceModel: string;
        appsflyerId: string;
        advertisingId?: string;
    }) => Promise<any>;
    resendConfirmEmail: () => Promise<any>;
    restoreUser: (options: {
        userId: number;
    }) => Promise<any>;
    revokeTokens: () => Promise<any>;
    saveAccountWithEmail: (options: {
        email: string;
        password?: string;
        currentPassword?: string;
        emailGrantToken?: string;
    }) => Promise<any>;
    /** @ignore */
    private get uuid();
    /** @ignore */
    private get deviceUuid();
    /** @ignore */
    private get signedInfo();
}
