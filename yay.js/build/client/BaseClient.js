"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const AIPaca_1 = require("../lib/AIPaca");
const Auth_1 = require("../lib/Auth");
const Block_1 = require("../lib/Block");
const Call_1 = require("../lib/Call");
const Chat_1 = require("../lib/Chat");
const Config_1 = require("../lib/Config");
const Game_1 = require("../lib/Game");
const Gift_1 = require("../lib/Gift");
const Group_1 = require("../lib/Group");
const Hidden_1 = require("../lib/Hidden");
const Misc_1 = require("../lib/Misc");
const MuteKeyword_1 = require("../lib/MuteKeyword");
const Notification_1 = require("../lib/Notification");
const Post_1 = require("../lib/Post");
const Review_1 = require("../lib/Review");
const Thread_1 = require("../lib/Thread");
const User_1 = require("../lib/User");
const Rest_1 = require("../util/Rest");
const Constants_1 = require("../util/Constants");
const Cookie_1 = require("../util/Cookie");
const Errors_1 = require("../util/Errors");
const Events_1 = require("../util/Events");
const HeaderInterceptor_1 = require("../util/HeaderInterceptor");
const WebSocketInteractor_1 = require("../util/WebSocketInteractor");
const Logger_1 = require("../util/Logger");
const Version_1 = require("../util/Version");
const node_events_1 = __importDefault(require("node:events"));
/**
 * yay.js クライアントの基底クラス
 *
 * @remarks
 * クライアント処理を担当する、クライアントの基底クラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class BaseClient extends node_events_1.default {
    constructor(options) {
        super();
        this.setCookie = (options) => {
            this.cookie.set({
                ...this.cookies,
                authentication: {
                    accessToken: options.accessToken,
                    refreshToken: options.refresh_token ?? this.cookie.refreshToken,
                },
                user: {
                    email: options.email ?? this.cookie.email,
                    userId: options.userId ?? this.cookie.userId,
                    uuid: options.uuid ?? this.cookie.uuid,
                },
                device: {
                    deviceUuid: options.deviceUuid ?? this.cookie.deviceUuid,
                },
            });
        };
        this.authenticate = async (options) => {
            try {
                this.cookie.load(options.email);
                return {
                    accessToken: this.accessToken,
                    refreshToken: this.refreshToken,
                    userId: this.userId,
                };
            }
            catch (error) {
                const res = await this.authAPI.loginWithEmail({
                    email: options.email,
                    password: options.password,
                });
                if (!res.accessToken) {
                    throw new Errors_1.ForbiddenError({
                        result: 'error',
                        message: 'invalid email or password',
                        errorCode: Errors_1.ErrorCode.InvalidEmailOrPassword,
                        banUntil: null,
                    });
                }
                this.cookie.set({
                    authentication: { accessToken: res.accessToken, refreshToken: res.refreshToken },
                    user: { userId: res.userId, email: options?.email, uuid: this.uuid },
                    device: { deviceUuid: this.deviceUuid },
                });
                this.cookie.save();
                return res;
            }
        };
        this.prepare = async (options) => {
            const res = await this.authenticate(options);
            this.logger.info(`yay.js v${Version_1.packageVersion} - UID: ${this.userId}`);
            if (this.intents.length) {
                this.logger.info('Connecting to Gateway.');
                const wsToken = (await this.miscAPI.getWebSocketToken()).token;
                this.ws.connect(wsToken, this.intents);
                this.on(Events_1.Events.WebSocketTokenExpire, async () => {
                    this.logger.debug('WebSocket token expired.');
                    const wsToken = (await this.miscAPI.getWebSocketToken()).token;
                    this.ws.connect(wsToken, this.intents);
                });
            }
            // 利用規約に同意する
            const policyResponse = await this.miscAPI.getPolicyAgreements();
            if (!policyResponse.latestPrivacyPolicyAgreed)
                this.miscAPI.acceptPolicyAgreement({ type: 'privacy_policy' });
            if (!policyResponse.latestTermsOfUseAgreed)
                this.miscAPI.acceptPolicyAgreement({ type: 'terms_of_use' });
            return res;
        };
        this.request = async (options) => {
            // X-Client-IPがヘッダーになければ設定する
            if (!this.headerInterceptor.getClientIP() && options.route !== 'v2/users/timestamp') {
                const res = await this.userAPI.getTimestamp();
                this.headerInterceptor.setClientIP(res.ipAddress);
            }
            let response = undefined;
            let backoffDuration = 0;
            let authRetryCount = 0;
            const maxAuthRetries = 2;
            const maxRateLimitRetries = 15;
            for (let i = 0; i < this.maxRetries; i++) {
                if (backoffDuration > 0) {
                    await new Promise((resolve) => setTimeout(resolve, backoffDuration));
                }
                const defaultHeaders = { ...this.headerInterceptor.intercept() };
                const customHeaders = { ...options.headers, ...defaultHeaders };
                options.headers = customHeaders || defaultHeaders;
                response = await this.rest.request(options);
                // アクセストークンの有効期限が切れたらリフレッシュする
                if (this.isAccessTokenExpiredError(response)) {
                    if (options.route === 'api/v1/oauth/token') {
                        throw new Errors_1.AuthenticationError(response.data);
                    }
                    authRetryCount++;
                    if (authRetryCount < maxAuthRetries) {
                        await this.refreshTokens();
                        continue;
                    }
                    else {
                        this.cookie.destroy();
                        response.data.message = '認証の再試行に失敗しました。再ログインしてください。';
                        throw new Errors_1.AuthenticationError(response.data);
                    }
                }
                // レート制限の場合は待機する
                if (this.waitOnRateLimit && this.isRateLimitError(response)) {
                    let rateLimitRetryCount = 1;
                    while (rateLimitRetryCount < maxRateLimitRetries) {
                        const retryAfter = 60 * 5;
                        this.logger.warn(`レート制限に達しました。再試行まで ${retryAfter}秒 待機します。`);
                        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
                    }
                    options.headers['X-Timestamp'] = Date.now().toString();
                    const response = await this.rest.request(options);
                    if (!this.isRateLimitError(response)) {
                        break;
                    }
                    rateLimitRetryCount++;
                    if (rateLimitRetryCount >= maxRateLimitRetries) {
                        response.data.message = 'レート制限の最大再試行回数に達しました。';
                        throw new Errors_1.RateLimitError(response.data);
                    }
                }
                if (response && !this.retryStatuses.includes(response.status)) {
                    break;
                }
                if (response) {
                    this.logger.error(`リクエストに失敗しました。再試行しています。[code: ${response.status}]`);
                }
                else {
                    this.logger.error('リクエストに失敗しました。再試行しています。');
                }
                backoffDuration = this.backoffFactor * Math.pow(2, i);
            }
            if (response) {
                return this.handleResponse(response);
            }
        };
        this.isAccessTokenExpiredError = (response) => {
            return (response.status === 401 &&
                (response.data.errorCode === Errors_1.ErrorCode.AccessTokenExpired ||
                    response.data.errorCode === Errors_1.ErrorCode.AccessTokenInvalid));
        };
        this.isRateLimitError = (response) => {
            if (response.status === 429) {
                return true;
            }
            if (response.status === 400) {
                if (response.data.errorCode === Errors_1.ErrorCode.QuotaLimitExceeded) {
                    return true;
                }
            }
            return false;
        };
        this.refreshTokens = async () => {
            const res = await this.authAPI.getToken({ grantType: 'refresh_token', refreshToken: this.refreshToken });
            this.cookie.set({
                ...this.cookies,
                authentication: { accessToken: res.accessToken, refreshToken: res.refreshToken },
            });
            this.cookie.save();
        };
        this.handleResponse = (response) => {
            const { status, data } = response;
            switch (status) {
                case 400:
                    throw new Errors_1.BadRequestError(data);
                case 401:
                    throw new Errors_1.AuthenticationError(data);
                case 403:
                    throw new Errors_1.ForbiddenError(data);
                case 404:
                    throw new Errors_1.NotFoundError(data);
                case 429:
                    throw new Errors_1.RateLimitError(data);
                case 500:
                    throw new Errors_1.ServerError(data);
                default:
                    if (status >= 200 && status < 300) {
                        return data;
                    }
                    else {
                        throw new Errors_1.HTTPError(data);
                    }
            }
        };
        options = options || {};
        this.maxRetries = options.maxRetries ?? 3;
        this.backoffFactor = options.backoffFactor ?? 1.5;
        this.waitOnRateLimit = options.waitOnRateLimit ?? true;
        this.retryStatuses = [500, 502, 503, 504];
        this.intents = options.intents ?? [];
        this.cookie =
            options.cookie ??
                new Cookie_1.Cookie(options.saveCookie, options.cookieDirPath, options.cookieFilename, options.cookiePassword);
        this.logger = new Logger_1.YJSLogger(options.debugMode, options.disableLog);
        this.headerInterceptor = new HeaderInterceptor_1.HeaderInterceptor(Constants_1.DEFAULT_DEVICE, this.cookie);
        this.headerInterceptor.setConnectionSpeed('0');
        this.ws = new WebSocketInteractor_1.WebSocketInteractor(this);
        this.rest = new Rest_1.REST({
            logger: this.logger,
            baseURL: Constants_1.BASE_API_URL,
            proxy: options.proxy,
            timeout: options.timeout,
            defaultHeaders: this.headerInterceptor.intercept(),
        });
        this.aiPacaAPI = new AIPaca_1.AIPacaAPI(this);
        this.authAPI = new Auth_1.AuthAPI(this);
        this.blockAPI = new Block_1.BlockAPI(this);
        this.callAPI = new Call_1.CallAPI(this);
        this.chatAPI = new Chat_1.ChatAPI(this);
        this.configAPI = new Config_1.ConfigAPI(this);
        this.gameAPI = new Game_1.GameAPI(this);
        this.giftAPI = new Gift_1.GiftAPI(this);
        this.groupAPI = new Group_1.GroupAPI(this);
        this.hiddenAPI = new Hidden_1.HiddenAPI(this);
        this.miscAPI = new Misc_1.MiscAPI(this);
        this.muteKeywordAPI = new MuteKeyword_1.MuteKeywordAPI(this);
        this.notificationAPI = new Notification_1.NotificationAPI(this);
        this.postAPI = new Post_1.PostAPI(this);
        this.reviewAPI = new Review_1.ReviewAPI(this);
        this.threadAPI = new Thread_1.ThreadAPI(this);
        this.userAPI = new User_1.UserAPI(this);
    }
    get cookies() {
        return this.cookie.get();
    }
    get userId() {
        return this.cookie.userId;
    }
    get uuid() {
        return this.cookie.uuid;
    }
    get deviceUuid() {
        return this.cookie.deviceUuid;
    }
    get accessToken() {
        return this.cookie.accessToken;
    }
    get refreshToken() {
        return this.cookie.refreshToken;
    }
}
exports.BaseClient = BaseClient;
