/// <reference types="node" />
import { AIPacaAPI } from '../lib/AIPaca';
import { AuthAPI } from '../lib/Auth';
import { BlockAPI } from '../lib/Block';
import { CallAPI } from '../lib/Call';
import { ChatAPI } from '../lib/Chat';
import { ConfigAPI } from '../lib/Config';
import { GameAPI } from '../lib/Game';
import { GiftAPI } from '../lib/Gift';
import { GroupAPI } from '../lib/Group';
import { HiddenAPI } from '../lib/Hidden';
import { MiscAPI } from '../lib/Misc';
import { MuteKeywordAPI } from '../lib/MuteKeyword';
import { NotificationAPI } from '../lib/Notification';
import { PostAPI } from '../lib/Post';
import { ReviewAPI } from '../lib/Review';
import { ThreadAPI } from '../lib/Thread';
import { UserAPI } from '../lib/User';
import { WebSocketInteractor } from '../util/WebSocketInteractor';
import { LoginUserResponse } from '../util/Responses';
import { ClientOptions, CookieProps, LoginEmailUserRequest, RequestOptions } from '../util/Types';
import { YJSLogger } from '../util/Logger';
import EventEmitter from 'node:events';
/**
 * yay.js クライアントの基底クラス
 *
 * @remarks
 * クライアント処理を担当する、クライアントの基底クラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class BaseClient extends EventEmitter {
    private rest;
    private cookie;
    private headerInterceptor;
    private maxRetries;
    private backoffFactor;
    private waitOnRateLimit;
    private retryStatuses;
    private intents;
    protected readonly aiPacaAPI: AIPacaAPI;
    protected readonly authAPI: AuthAPI;
    protected readonly blockAPI: BlockAPI;
    protected readonly callAPI: CallAPI;
    protected readonly chatAPI: ChatAPI;
    protected readonly configAPI: ConfigAPI;
    protected readonly gameAPI: GameAPI;
    protected readonly giftAPI: GiftAPI;
    protected readonly groupAPI: GroupAPI;
    protected readonly hiddenAPI: HiddenAPI;
    protected readonly miscAPI: MiscAPI;
    protected readonly muteKeywordAPI: MuteKeywordAPI;
    protected readonly notificationAPI: NotificationAPI;
    protected readonly postAPI: PostAPI;
    protected readonly reviewAPI: ReviewAPI;
    protected readonly threadAPI: ThreadAPI;
    protected readonly userAPI: UserAPI;
    protected ws: WebSocketInteractor;
    logger: YJSLogger;
    constructor(options?: ClientOptions);
    get cookies(): CookieProps;
    get userId(): number;
    get uuid(): string;
    get deviceUuid(): string;
    protected get accessToken(): string;
    protected get refreshToken(): string;
    setCookie: (options: {
        accessToken: string;
        refresh_token?: string;
        userId?: number;
        email?: string;
        uuid?: string;
        deviceUuid?: string;
    }) => void;
    private authenticate;
    protected prepare: (options: LoginEmailUserRequest) => Promise<LoginUserResponse>;
    request: (options: RequestOptions) => Promise<any>;
    private isAccessTokenExpiredError;
    private isRateLimitError;
    private refreshTokens;
    private handleResponse;
}
