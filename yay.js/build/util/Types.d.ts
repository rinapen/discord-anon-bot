import { AxiosProxyConfig } from 'axios';
import { YJSLogger } from './Logger';
import { Cookie } from './Cookie';
/**
 * RESTクラスのrequest関数の引数
 */
export type RESTOptions = {
    logger: YJSLogger;
    baseURL: string;
    proxy?: AxiosProxyConfig;
    timeout?: number;
    defaultHeaders: Record<string, any>;
};
export type RequestOptions = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route: string;
    requireAuth: boolean;
    params?: Record<string, any>;
    json?: Record<string, any>;
    baseURL?: string;
    accessToken?: string;
    headers?: Record<string, any>;
};
export type ClientOptions = {
    /**
     * プロキシのアドレス
     */
    proxy?: AxiosProxyConfig;
    /**
     * リクエストの待機時間
     *
     * @defaultValue `30` 秒
     */
    timeout?: number;
    /**
     * リクエストの最大リトライ回数
     *
     * @defaultValue `3` 回
     */
    maxRetries?: number;
    /**
     * リトライ待機時間の増加割合係数
     *
     * @defaultValue `1.5` 倍
     */
    backoffFactor?: number;
    /**
     * レート制限を待機するか
     *
     * @defaultValue `true`
     */
    waitOnRateLimit?: boolean;
    /**
     * 独自のクッキー
     *
     * @defaultValue `true`
     */
    cookie?: Cookie;
    /**
     * クッキーを保存するか
     *
     * @defaultValue `true`
     */
    saveCookie?: boolean;
    /**
     * クッキーを暗号化&復号化する際のパスワード
     *
     * @defaultValue `true`
     */
    cookiePassword?: string;
    /**
     * クッキーを保存するパス
     *
     * @defaultValue 作業デレクトリ
     */
    cookieDirPath?: string;
    /**
     * クッキーを保存するファイル名
     *
     * @defaultValue `'cookie.json'`
     */
    cookieFilename?: string;
    /**
     * 取得するWebSocketイベントの範囲
     *
     * @defaultValue `'undefined'`
     */
    intents?: string[];
    /**
     * ログのデバッグモードをオンにするか
     *
     * @defaultValue `false`
     */
    debugMode?: boolean;
    /**
     * ログを非表示にするか
     *
     * @defaultValue `false`
     */
    disableLog?: boolean;
};
export type CookieProps = {
    authentication: CookieAuthentication;
    user: CookieUser;
    device: CookieDevice;
};
export type CookieAuthentication = {
    accessToken: string;
    refreshToken: string;
};
export type CookieUser = {
    userId: number;
    email: string;
    uuid: string;
};
export type CookieDevice = {
    deviceUuid: string;
};
export type Device = {
    deviceType: string;
    osVersion: string;
    screenDensity: string;
    screenSize: string;
    model: string;
};
export type RequestObject = Record<string, unknown>;
export type LoginEmailUserRequest = {
    email: string;
    password: string;
};
export type SearchCriteria = {
    nickname?: string;
    username?: string;
    biography?: string;
    prefecture?: string;
    gender?: number;
};
export interface ChannelCommand {
    command?: string;
    identifier?: string;
}
export interface ChannelMessage {
    identifier?: string;
    message?: EventMessage;
    type?: string;
    sid?: string;
}
export interface Identifier {
    channel?: string;
}
export interface EventMessage {
    data?: Record<string, any>;
    message?: Record<string, any>;
    event?: string;
}
export interface ErrorResponse {
    result: string;
    message: string;
    errorCode: number;
    banUntil: number | null;
}
export declare const GatewayIntents: {
    [key: string]: string;
};
/**
 * 投稿のタイプ
 */
export declare const PostType: {
    [key: string]: string;
};
/**
 * 通話のタイプ
 */
export declare const CallType: {
    [key: string]: string;
};
/**
 * 画像のタイプ
 */
export declare const ImageType: {
    [key: string]: string;
};
/**
 * 共有のタイプ
 */
export declare const ShareableType: {
    [key: string]: string;
};
