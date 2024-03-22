import { EmailGrantTokenResponse, EmailVerificationPresignedUrlResponse, PolicyAgreementsResponse, PresignedUrlResponse, PresignedUrlsResponse, PromotionsResponse, VerifyDeviceResponse, VipGameRewardUrlResponse, WebSocketTokenResponse } from '../util/Responses';
import { BaseClient } from '../client/BaseClient';
/**
 * **雑多API**
 *
 * @remarks
 * カテゴリ化できないAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class MiscAPI {
    private readonly base;
    constructor(base: BaseClient);
    acceptPolicyAgreement: (options: {
        type: string;
    }) => Promise<any>;
    getEmailGrantToken: (options: {
        email: string;
        code: string;
    }) => Promise<EmailGrantTokenResponse>;
    getEmailVerificationPresignedUrl: (options: {
        email: string;
        locale: string;
        intent?: string;
    }) => Promise<EmailVerificationPresignedUrlResponse>;
    getFileUploadPresignedUrls: (options: {
        filenames: string[];
    }) => Promise<PresignedUrlsResponse>;
    getOldFileUploadPresignedUrl: (options: {
        videoFilename: string;
    }) => Promise<PresignedUrlResponse>;
    getPolicyAgreements: () => Promise<PolicyAgreementsResponse>;
    getPromotions: (options: {
        page: number;
        number?: number;
    }) => Promise<PromotionsResponse>;
    getVipGameRewardUrl: (options: {
        deviceType: string;
    }) => Promise<VipGameRewardUrlResponse>;
    getWebSocketToken: () => Promise<WebSocketTokenResponse>;
    svc: (options: {
        email: string;
        locale: string;
    }) => Promise<any>;
    verifyDevice: (options: {
        platform: string;
        verificationString: string;
    }) => Promise<VerifyDeviceResponse>;
    /** @ignore */
    private get uuid();
    /** @ignore */
    private get deviceUuid();
}
