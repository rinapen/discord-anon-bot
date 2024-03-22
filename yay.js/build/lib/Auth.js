"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAPI = void 0;
const Constants_1 = require("../util/Constants");
const util = __importStar(require("../util/Utils"));
/**
 * **認証API**
 *
 * @remarks
 * 認証APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class AuthAPI {
    constructor(base) {
        this.base = base;
        this.changeEmail = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/users/change_email`,
                requireAuth: false,
                json: {
                    api_key: Constants_1.API_KEY,
                    email: options.email,
                    password: options.password,
                    email_grant_token: options.emailGrantToken,
                },
            });
        };
        this.changePassword = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/users/change_password`,
                requireAuth: false,
                json: {
                    api_key: Constants_1.API_KEY,
                    current_password: options.currentPassword,
                    password: options.newPassword,
                },
            });
        };
        this.getToken = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `api/v1/oauth/token`,
                requireAuth: false,
                json: {
                    grant_type: options.grantType,
                    email: options.email,
                    password: options.password,
                    refresh_token: options.refreshToken,
                },
            });
        };
        this.loginWithEmail = async (request) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/users/login_with_email`,
                requireAuth: false,
                json: {
                    api_key: Constants_1.API_KEY,
                    email: request.email,
                    password: request.password,
                    uuid: this.uuid,
                },
            });
        };
        this.logoutDevice = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/logout`,
                requireAuth: false,
                json: { uuid: this.uuid },
            });
        };
        this.migrateToken = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `api/v1/oauth/token/migrate`,
                requireAuth: false,
                params: { token: options.token },
            });
        };
        this.registerDeviceToken = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/device_tokens/new`,
                requireAuth: false,
                json: {
                    device_token: options.deviceToken,
                    device_type: options.deviceType,
                    uuid: this.uuid,
                    os_version: options.osVersion,
                    app_version: Constants_1.API_VERSION_NAME,
                    screen_resolution: options.screenResolution,
                    screen_density: options.screenDensity,
                    device_model: options.deviceModel,
                    appsflyer_id: options.appsflyerId,
                    advertising_id: options.advertisingId,
                },
            });
        };
        this.resendConfirmEmail = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/resend_confirm_email`,
                requireAuth: false,
            });
        };
        this.restoreUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/restore`,
                requireAuth: false,
                json: {
                    user_id: options.userId,
                    api_key: Constants_1.API_KEY,
                    uuid: this.uuid,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
            });
        };
        this.revokeTokens = async () => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/users/device_tokens`,
                requireAuth: false,
            });
        };
        this.saveAccountWithEmail = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/users/login_update`,
                requireAuth: false,
                json: {
                    api_key: Constants_1.API_KEY,
                    email: options.email,
                    password: options.password,
                    current_password: options.currentPassword,
                    email_grant_token: options.emailGrantToken,
                },
            });
        };
    }
    /** @ignore */
    get uuid() {
        return this.base.uuid;
    }
    /** @ignore */
    get deviceUuid() {
        return this.base.deviceUuid;
    }
    /** @ignore */
    get signedInfo() {
        return util.md5(this.deviceUuid, Math.floor(Date.now() / 1000), false);
    }
}
exports.AuthAPI = AuthAPI;
