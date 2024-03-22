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
exports.Client = void 0;
const BaseClient_1 = require("./BaseClient");
const util = __importStar(require("../util/Utils"));
const CaseConverter_1 = require("../util/CaseConverter");
/**
 * **yay.js - クライアント**
 *
 * @remarks
 * yay.js のエントリーポイントとなるクラスです
 *
 * @example
 * ```typescript
 * import { Client } from 'yay.js';
 *
 * const main = async () => {
 * 	const client = new Client();
 *
 *		await client.login({
 *			email: 'yourEmail',
 *			password: 'yourPassword',
 *		});
 *
 *		await client.createPost({
 *			text: 'Hello with yay.js!',
 *			sharedUrl: 'https://github.com/qvco/yay.js',
 *		});
 * };
 *
 * main();
 * ```
 *
 * @see {@link https://qvco.github.io/yay.js/classes/Client | ドキュメントを参照}
 *
 */
class Client extends BaseClient_1.BaseClient {
    constructor(options) {
        super(options);
        // AuthAPI
        /**
         *
         * **メールアドレスを変更します**
         *
         * @param options.email - 新しいメールアドレス
         * @param options.password - アカウントのパスワード
         * @param options.emailGrantToken - メール認証トークン
         *
         * @endpoint
         * `PUT`: {@link https://api.yay.space/v1/users/change_email}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#changeEmail | ドキュメントを参照}
         *
         */
        this.changeEmail = async (options) => await this.authAPI.changeEmail(options);
        /**
         *
         * **パスワードを変更します**
         *
         * @param options.currentPassword - 現在のパスワード
         * @param options.newPassword - 新しいパスワード
         *
         * @endpoint
         * `PUT`: {@link https://api.yay.space/v1/users/change_password}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#changePassword | ドキュメントを参照}
         *
         */
        this.changePassword = async (options) => await this.authAPI.changePassword(options);
        /**
         *
         * **新しいトークンを取得します**
         *
         * @param options.grantType - 取得する方法
         * @param options.email - メールアドレス
         * @param options.password - ・パスワード
         * @param options.refreshToken - リフレッシュトークン
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/api/v1/oauth/token}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getToken | ドキュメントを参照}
         *
         */
        this.getToken = async (options) => {
            return await this.authAPI.getToken(options);
        };
        /**
         *
         * **メールアドレスでログインします**
         *
         * @param options.email - メールアドレス
         * @param options.password - ・パスワード
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v3/users/login_with_email}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#login | ドキュメントを参照}
         *
         */
        this.login = async (options) => {
            return await this.prepare({ email: options.email, password: options.password });
        };
        /**
         *
         * **ログアウトします**
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/users/logout}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#logout | ドキュメントを参照}
         *
         */
        this.logout = async () => {
            return await this.authAPI.logoutDevice();
        };
        /**
         *
         * **トークンを移行します**
         *
         * @param options.token - トークン
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/api/v1/oauth/token/migrate}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#migrateToken | ドキュメントを参照}
         *
         */
        this.migrateToken = async (options) => {
            return await this.authAPI.migrateToken(options);
        };
        /**
         *
         * **デバイストークンを登録します**
         *
         * @param options.deviceToken - デバイストークン
         * @param options.deviceType - デバイスのタイプ
         * @param options.osVersion - デバイスのOS
         * @param options.screenResolution - スクリーンの画質
         * @param options.screenDensity - スクリーンの比
         * @param options.deviceModel - デバイスのモデル
         * @param options.appsflyerId - AppsFlyerのID
         * @param options.advertisingId - 宣伝ID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v2/users/device_tokens/new}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#registerDeviceToken | ドキュメントを参照}
         *
         */
        this.registerDeviceToken = async (options) => {
            return await this.authAPI.registerDeviceToken(options);
        };
        /**
         *
         * **確認メールを再送信します**
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v2/users/resend_confirm_email}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#resendConfirmEmail | ドキュメントを参照}
         *
         */
        this.resendConfirmEmail = async () => {
            return await this.authAPI.resendConfirmEmail();
        };
        /**
         *
         * **ユーザーを復元します**
         *
         * @param options.userId - ユーザーのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/api/v1/oauth/token/migrate}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#restoreUser | ドキュメントを参照}
         *
         */
        this.restoreUser = async (options) => {
            return await this.authAPI.restoreUser(options);
        };
        /**
         *
         * **デバイストークンを無効化します**
         *
         * @endpoint
         * `DELETE`: {@link https://api.yay.space/v1/users/device_tokens}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#revokeDeviceTokens | ドキュメントを参照}
         *
         */
        this.revokeDeviceTokens = async () => {
            return await this.authAPI.revokeTokens();
        };
        /**
         *
         * **アカウントをメールアドレスと紐付けます**
         *
         * @param options.email - メールアドレス
         * @param options.password - パスワード
         * @param options.currentPassword - 現在のパスワード
         * @param options.emailGrantToken - メール認証トークン
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v3/users/login_update}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#saveAccountWithEmail | ドキュメントを参照}
         *
         */
        this.saveAccountWithEmail = async (options) => {
            return await this.authAPI.saveAccountWithEmail(options);
        };
        // BlockAPI
        /**
         *
         * **ユーザーをブロックします**
         *
         * @param options.userId - ユーザーのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/users/:userId/block}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#blockUser | ドキュメントを参照}
         *
         */
        this.blockUser = async (options) => {
            return await this.blockAPI.blockUser(options);
        };
        /**
         *
         * **あなたをブロックしているユーザーのIDを取得します**
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/users/block_ids}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBlockedUserIds | ドキュメントを参照}
         *
         */
        this.getBlockedUserIds = async () => {
            return (await this.blockAPI.getBlockedUserIds()).blockIds;
        };
        /**
         *
         * **ブロックしているユーザーのIDを取得します**
         *
         * @param options.nickname - カスタムユーザーID
         * @param options.username - ユーザー名
         * @param options.biography - 自己紹介文
         * @param options.prefecture - 都道府県
         * @param options.gender - 性別
         * @param options.fromId - 取得元ID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v2/users/blocked}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBlockedUsers | ドキュメントを参照}
         *
         */
        this.getBlockedUsers = async (options = {}) => {
            return await this.blockAPI.getBlockedUsers(options);
        };
        /**
         *
         * **ユーザーのブロックを解除します**
         *
         * @param options.userId - ユーザーのID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v2/users/:userId/unblock}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#unblockUser | ドキュメントを参照}
         *
         */
        this.unblockUser = async (options) => {
            return await this.blockAPI.unblockUser(options);
        };
        // CallAPI
        /**
         *
         * **通話に参加できる上限人数を設定します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.participantLimit - 参加上限人数
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/:callId/bump}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#bumpCall | ドキュメントを参照}
         *
         */
        this.bumpCall = async (options) => {
            return await this.callAPI.bumpCall(options);
        };
        /**
         *
         * **ユーザーが参加している通話を取得します**
         *
         * @param options.userId - ユーザーのID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/posts/active_call}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getUserActiveCall | ドキュメントを参照}
         *
         */
        this.getUserActiveCall = async (options) => {
            return await this.callAPI.getActiveCall(options);
        };
        /**
         *
         * **通話用のデフォルトBGMを取得します**
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/calls/bgm}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBgms | ドキュメントを参照}
         *
         */
        this.getBgms = async () => {
            return await this.callAPI.getBgms();
        };
        /**
         *
         * **通話ルームのデータを取得します**
         *
         * @param options.callId - 通話ルームのID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/calls/conferences/:callId}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCall | ドキュメントを参照}
         *
         */
        this.getCall = async (options) => {
            return await this.callAPI.getCall(options);
        };
        /**
         *
         * **通話ルームに招待可能なユーザーを取得します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.fromTimestamp - 取得元タイムスタンプ
         * @param options.nickname - ニックネーム
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/calls/:callId/users/invitable}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCallInvitableUsers | ドキュメントを参照}
         *
         */
        this.getCallInvitableUsers = async (options) => {
            return await this.callAPI.getCallInvitableUsers(options);
        };
        /**
         *
         * **通話の状態を取得します**
         *
         * @param options.opponentId - 相手のID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/calls/:callId/users/invitable}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCallStatus | ドキュメントを参照}
         *
         */
        this.getCallStatus = async (options) => {
            return await this.callAPI.getCallStatus(options);
        };
        /**
         *
         * **ゲームを取得します**
         *
         * @param options.number - 取得する数
         * @param options.gameIds - ゲームのID
         * @param options.fromId - 取得元ID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/games/apps}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGames | ドキュメントを参照}
         *
         */
        this.getGames = async (options) => {
            return await this.callAPI.getGames(options);
        };
        /**
         *
         * **ジャンルを取得します**
         *
         * @param options.number - 取得する数
         * @param options.from - 取得元ID
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/genres}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGenres | ドキュメントを参照}
         *
         */
        this.getGenres = async (options) => {
            return await this.callAPI.getGenres(options);
        };
        /**
         *
         * **サークルの通話を取得します**
         *
         * @param options.number - 取得する数
         * @param options.groupCategoryId - サークルのカテゴリーID
         * @param options.fromTimestamp - 取得元タイムスタンプ
         * @param options.scope - 取得する範囲
         *
         * @endpoint
         * `GET`: {@link https://api.yay.space/v1/posts/group_calls}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGroupCalls | ドキュメントを参照}
         *
         */
        this.getGroupCalls = async (options = {}) => {
            return await this.callAPI.getGroupCalls(options);
        };
        /**
         *
         * **招待可能なユーザーを通話に招待します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.groupId - サークルのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/:callId/bulk_invite}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteOnlineUsersToCall | ドキュメントを参照}
         *
         */
        this.inviteOnlineUsersToCall = async (options) => {
            return await this.callAPI.inviteToCallBulk(options);
        };
        /**
         *
         * **ユーザーを通話に招待します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.userIds - 招待するユーザーのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/conference_calls/:callId/invite}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteUsersToCall | ドキュメントを参照}
         *
         */
        this.inviteUsersToCall = async (options) => {
            return await this.callAPI.inviteUsersToCall(options);
        };
        /**
         *
         * **ユーザーをチャットルームの通話に招待します**
         *
         * @param options.chatRoomId - チャットルームのID
         * @param options.roomId - ルームID
         * @param options.roomUrl - ルームのURL
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v2/calls/invite}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteUsersToChatCall | ドキュメントを参照}
         *
         */
        this.inviteUsersToChatCall = async (options = {}) => {
            return await this.callAPI.inviteUsersToChatCall(options);
        };
        /**
         *
         * **ユーザーを通話から追放します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.userId - 追放するユーザーのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/conference_calls/:callId/kick}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#banUserFromCall | ドキュメントを参照}
         *
         */
        this.banUserFromCall = async (options) => {
            return await this.callAPI.kickAndBanFromCall(options);
        };
        /**
         *
         * **匿名ユーザーが通話から退出したことを通知します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.agoraUid - AgoraのUID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/anonymous_calls/leave_agora_channel}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#notifyAnonymousUserLeaveCall | ドキュメントを参照}
         *
         */
        this.notifyAnonymousUserLeaveCall = async (options) => {
            return await this.callAPI.notifyAnonymousUserLeaveAgoraChannel(options);
        };
        /**
         *
         * **ユーザーが通話から退出したことを通知します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.userId - ユーザーのID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/leave_agora_channel}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#notifyUserLeaveCall | ドキュメントを参照}
         *
         */
        this.notifyUserLeaveCall = async (options) => {
            return await this.callAPI.notifyUserLeaveAgoraChannel(options);
        };
        /**
         *
         * **通話のスクリーンショットを送信します**
         *
         * @param options.screenshotFilename - スクリーンショットのファイル名
         * @param options.conferenceId - 通話ルームのID
         *
         * @endpoint
         * `PUT`: {@link https://api.yay.space/v1/calls/screenshot}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#sendCallScreenshot | ドキュメントを参照}
         *
         */
        this.sendCallScreenshot = async (options) => {
            return await this.callAPI.sendCallScreenshot(options);
        };
        /**
         *
         * **通話を開始します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.joinableBy - 参加可能なユーザー
         * @param options.gameTitle - ゲームのタイトル
         * @param options.categoryId - カテゴリーID
         *
         * @endpoint
         * `PUT`: {@link https://api.yay.space/v1/calls/:callId}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#startCall | ドキュメントを参照}
         *
         */
        this.startCall = async (options) => {
            return await this.callAPI.setCall(options);
        };
        /**
         *
         * **通話参加者の権限を設定します**
         *
         * @param options.callId - 通話ルームのID
         * @param options.userId - ユーザーのID
         * @param options.role - 権限 / 役割
         *
         * @endpoint
         * `PUT`: {@link https://api.yay.space/v1/calls/:callId/users/:userId}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#setCallUserRole | ドキュメントを参照}
         *
         */
        this.setCallUserRole = async (options) => {
            return await this.callAPI.setUserRole(options);
        };
        /**
         *
         * **通話に参加します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.callSid - 通話のSID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v2/calls/start_conference_call}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#joinCall | ドキュメントを参照}
         *
         */
        this.joinCall = async (options) => {
            return await this.callAPI.startCall(options);
        };
        /**
         *
         * **通話から退出します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.callSid - 通話のSID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/calls/leave_conference_call}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#leaveCall | ドキュメントを参照}
         *
         */
        this.leaveCall = async (options) => {
            return await this.callAPI.stopCall(options);
        };
        /**
         *
         * **匿名ユーザーとして通話に参加します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.AgoraUid - AgoraのUID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/anonymous_calls/start_conference_call}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#joinCallAsAnonymous | ドキュメントを参照}
         *
         */
        this.joinCallAsAnonymous = async (options) => {
            return await this.callAPI.startAnonymousCall(options);
        };
        /**
         *
         * **匿名ユーザーとして通話から退出します**
         *
         * @param options.conferenceId - 通話ルームのID
         * @param options.AgoraUid - AgoraのUID
         *
         * @endpoint
         * `POST`: {@link https://api.yay.space/v1/anonymous_calls/leave_conference_call}
         *
         * @see {@link https://qvco.github.io/yay.js/classes/Client.html#leaveCallAsAnonymous | ドキュメントを参照}
         *
         */
        this.leaveCallAsAnonymous = async (options) => {
            return await this.callAPI.stopAnonymousCall(options);
        };
        // ChatAPI
        this.acceptChatRequest = async (options) => {
            return await this.chatAPI.acceptRequest(options);
        };
        this.checkChatUnreadStatus = async (options = {}) => {
            return await this.chatAPI.checkUnreadStatus(options);
        };
        this.createGroupChat = async (options) => {
            return await this.chatAPI.createGroup(options);
        };
        this.createPrivateChat = async (options) => {
            return await this.chatAPI.createPrivate(options);
        };
        this.deleteChatBackground = async (options) => {
            return await this.chatAPI.deleteBackground(options);
        };
        this.deleteMessage = async (options) => {
            return await this.chatAPI.deleteMessage(options);
        };
        this.editChatRoom = async (options) => {
            return await this.chatAPI.edit(options);
        };
        this.getChatableUsers = async (
        // options?: SearchCriteria,
        options = {}) => {
            return await this.chatAPI.getChatableUsers(options);
        };
        this.getChatGifs = async () => {
            return (await this.chatAPI.getGifsData()).gifCategories;
        };
        this.getHiddenChatRooms = async (options = {}) => {
            return await this.chatAPI.getHiddenChatRooms(options);
        };
        this.getMainChatRooms = async (options = {}) => {
            return await this.chatAPI.getMainRooms(options);
        };
        this.getMessages = async (options) => {
            return await this.chatAPI.getMessages(options);
        };
        this.getChatNotificationSettings = async (options) => {
            return await this.chatAPI.getNotificationSettings(options);
        };
        this.getChatRequests = async (options = {}) => {
            return await this.chatAPI.getRequestRooms(options);
        };
        this.getChatRoom = async (options) => {
            return await this.chatAPI.getRoom(options);
        };
        this.getStickerPacks = async () => {
            return await this.chatAPI.getStickerPacks();
        };
        this.getTotalChatRequests = async () => {
            return await this.chatAPI.getTotalRequests();
        };
        this.hideChatRoom = async (options) => {
            return await this.chatAPI.hideChat(options);
        };
        this.inviteUsersToChatRoom = async (options) => {
            return await this.chatAPI.invite(options);
        };
        this.kickUsersFromChatRoom = async (options) => {
            return await this.chatAPI.kickUsers(options);
        };
        this.pinChatRoom = async (options) => {
            return await this.chatAPI.pin(options);
        };
        this.readMessageAttachment = async (options) => {
            return await this.chatAPI.readAttachment(options);
        };
        this.readMessage = async (options) => {
            return await this.chatAPI.readMessage(options);
        };
        this.readVideoMessage = async (options) => {
            return await this.chatAPI.readVideoMessage(options);
        };
        this.refreshChatRooms = async (options = {}) => {
            return await this.chatAPI.refreshRooms(options);
        };
        this.removeChatRooms = async (options) => {
            return await this.chatAPI.remove(options);
        };
        this.reportChatRoom = async (options) => {
            return await this.chatAPI.report(options);
        };
        this.sendChatRoomMediaScreenshotNotification = async (options) => {
            return await this.chatAPI.sendMediaScreenshotNotification(options);
        };
        this.sendMessage = async (options) => {
            return await this.chatAPI.sendMessage(options);
        };
        this.setChatRoomNotificationSettings = async (options) => {
            return await this.chatAPI.setNotificationSettings(options);
        };
        this.unhideChatRooms = async (options) => {
            return await this.chatAPI.unHideChat(options);
        };
        this.unpinChatRoom = async (options) => {
            return await this.chatAPI.unpin(options);
        };
        // ConfigAPI
        this.getAppConfig = async () => {
            return await this.configAPI.getAppConfig();
        };
        this.getBanWords = async (options) => {
            return await this.configAPI.getBanWords(options);
        };
        this.getPopularWords = async (options) => {
            return await this.configAPI.getPopularWords(options);
        };
        // GameAPI
        this.getWalkthroughs = async (options) => {
            return await this.gameAPI.getWalkthroughs(options);
        };
        this.requestWalkthrough = async (options) => {
            return await this.gameAPI.requestWalkthrough(options);
        };
        // GiftAPI
        // GroupAPI
        this.acceptGroupModeratorOffer = async (options) => {
            return await this.groupAPI.acceptModeratorOffer(options);
        };
        this.acceptGroupOwnershipOffer = async (options) => {
            return await this.groupAPI.acceptOwnershipOffer(options);
        };
        this.acceptGroupJoinRequest = async (options) => {
            return await this.groupAPI.acceptUserRequest(options);
        };
        this.addRelatedGroups = async (options) => {
            return await this.groupAPI.addRelatedGroups(options);
        };
        this.banGroupUser = async (options) => {
            return await this.groupAPI.banUser(options);
        };
        this.checkGroupUnreadStatus = async (options) => {
            return await this.groupAPI.checkUnreadStatus(options);
        };
        this.createGroup = async (options) => {
            return await this.groupAPI.create(options);
        };
        this.pinGroup = async (options) => {
            return await this.groupAPI.createPinGroup(options);
        };
        this.declineGroupModeratorOffer = async (options) => {
            return await this.groupAPI.declineModeratorOffer(options);
        };
        this.declineGroupOwnershipOffer = async (options) => {
            return await this.groupAPI.declineOwnershipOffer(options);
        };
        this.declineGroupJoinRequest = async (options) => {
            return await this.groupAPI.declineUserRequest(options);
        };
        this.deleteGroupCover = async (options) => {
            return await this.groupAPI.deleteCover(options);
        };
        this.deleteGroupIcon = async (options) => {
            return await this.groupAPI.deleteIcon(options);
        };
        this.unpinGroup = async (options) => {
            return await this.groupAPI.deletePinGroup(options);
        };
        this.getBannedGroupMembers = async (options) => {
            return await this.groupAPI.getBannedMembers(options);
        };
        this.getGroupCategories = async (options) => {
            return await this.groupAPI.getCategories(options);
        };
        this.getGroupCreateQuota = async () => {
            return await this.groupAPI.getCreateQuota();
        };
        this.getGroup = async (options) => {
            return await this.groupAPI.getGroup(options);
        };
        this.getGroupNotificationSettings = async (options) => {
            return await this.groupAPI.getGroupNotificationSettings(options);
        };
        this.getGroups = async (options) => {
            return await this.groupAPI.getGroups(options);
        };
        this.getGroupInvitableUsers = async (options) => {
            return await this.groupAPI.getInvitableUsers(options);
        };
        this.getGroupJoinedStatuses = async (options) => {
            return await this.groupAPI.getJoinedStatuses(options);
        };
        this.getGroupMember = async (options) => {
            return (await this.groupAPI.getMember(options)).groupUser;
        };
        this.getGroupMembers = async (options) => {
            return await this.groupAPI.getMembers(options);
        };
        this.getMyGroups = async (options) => {
            return await this.groupAPI.getMyGroups(options);
        };
        this.getRelatableGroups = async (options) => {
            return await this.groupAPI.getRelatableGroups(options);
        };
        this.getJoinedGroups = async (options) => {
            return await this.groupAPI.getUserGroups(options);
        };
        this.inviteUsersToGroup = async (options) => {
            return await this.groupAPI.inviteUsers(options);
        };
        this.joinGroup = async (options) => {
            return await this.groupAPI.join(options);
        };
        this.leaveGroup = async (options) => {
            return await this.groupAPI.leave(options);
        };
        this.removeGroupModerator = async (options) => {
            return await this.groupAPI.removeModerator(options);
        };
        /**
         *
         * **関連するサークルを削除します**
         *
         * @param options.groupId - サークルのID
         * @param options.relatedGroupIds - 関連するサークルのID
         *
         * @endpoint
         * `DELETE`: https://api.yay.space/v1/groups/:groupId/related
         *
         */
        this.removeRelatedGroups = async (options) => {
            return await this.groupAPI.removeRelatedGroups(options);
        };
        this.reportGroup = async (options) => {
            return await this.groupAPI.report(options);
        };
        this.sendGroupModeratorOffers = async (options) => {
            return await this.groupAPI.sendModeratorOffers(options);
        };
        this.sendGroupOwnershipOffer = async (options) => {
            return await this.groupAPI.sendOwnershipOffer(options);
        };
        this.setGroupNotificationSettings = async (options) => {
            return await this.groupAPI.setGroupNotificationSettings(options);
        };
        this.setGroupTitle = async (options) => {
            return await this.groupAPI.setTitle(options);
        };
        this.takeoverGroupOwnership = async (options) => {
            return await this.groupAPI.takeoverOwnership(options);
        };
        this.unbanGroupUser = async (options) => {
            return await this.groupAPI.unbanUser(options);
        };
        this.editGroup = async (options) => {
            return await this.groupAPI.update(options);
        };
        this.visitGroup = async (options) => {
            return await this.groupAPI.visit(options);
        };
        this.withdrawGroupModeratorOffer = async (options) => {
            return await this.groupAPI.withdrawModeratorOffer(options);
        };
        this.withdrawGroupOwnershipOffer = async (options) => {
            return await this.groupAPI.withdrawOwnershipOffer(options);
        };
        // HiddenAPI
        this.getMutedUsers = async (options) => {
            return await this.hiddenAPI.getList(options);
        };
        this.muteUser = async (options) => {
            return await this.hiddenAPI.hideUser(options);
        };
        this.unmuteUsers = async (options) => {
            return await this.hiddenAPI.unHideUsers(options);
        };
        // MiscAPI
        this.acceptPolicyAgreement = async (options) => {
            return await this.miscAPI.acceptPolicyAgreement(options);
        };
        this.getEmailGrantToken = async (options) => {
            return (await this.miscAPI.getEmailGrantToken(options)).emailGrantToken;
        };
        this.getEmailVerificationPresignedUrl = async (options) => {
            return await this.miscAPI.getEmailVerificationPresignedUrl(options);
        };
        this.getFileUploadPresignedUrls = async (options) => {
            return await this.miscAPI.getFileUploadPresignedUrls(options);
        };
        this.getVideoFileUploadPresignedUrl = async (options) => {
            return await this.miscAPI.getOldFileUploadPresignedUrl(options);
        };
        this.getPolicyAgreements = async () => {
            return await this.miscAPI.getPolicyAgreements();
        };
        this.getPromotions = async (options) => {
            return await this.miscAPI.getPromotions(options);
        };
        this.getVipGameRewardUrl = async (options) => {
            return await this.miscAPI.getVipGameRewardUrl(options);
        };
        this.getWebSocketToken = async () => {
            return (await this.miscAPI.getWebSocketToken()).token;
        };
        this.svc = async (options) => {
            return await this.miscAPI.svc(options);
        };
        this.verifyDevice = async (options) => {
            return await this.miscAPI.verifyDevice(options);
        };
        // MuteKeywordAPI
        this.muteKeyword = async (options) => {
            return (await this.muteKeywordAPI.createKeyword(options)).hiddenWord;
        };
        this.deleteMutedKeyword = async (options) => {
            return await this.muteKeywordAPI.deleteKeyword(options);
        };
        this.getMutedKeywords = async () => {
            return (await this.muteKeywordAPI.getKeywords()).hiddenWords;
        };
        this.editMutedKeyword = async (options) => {
            return (await this.muteKeywordAPI.updateKeyword(options)).hiddenWord;
        };
        // NotificationAPI
        this.getNotifications = async (options = {}) => {
            return await this.notificationAPI.getUserActivities(options);
        };
        this.getMergedNotifications = async (options = {}) => {
            return await this.notificationAPI.getUserMergedActivities(options);
        };
        this.receivedNotification = async (options) => {
            return await this.notificationAPI.receivedNotification(options);
        };
        // PostAPI
        this.addBookmark = async (options) => {
            return await this.postAPI.addBookmark(options);
        };
        this.addGroupHighlightPost = async (options) => {
            return await this.postAPI.addGroupHighlightPost(options);
        };
        this.createGroupCallPost = async (options = {}) => {
            let messageTags = undefined;
            if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
                messageTags = (0, CaseConverter_1.objectToSnake)(util.buildMessageTags(options.text));
                options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
            }
            return await this.postAPI.createGroupCallPost({ ...options, messageTags: messageTags });
        };
        this.pinGroupPost = async (options) => {
            return await this.postAPI.createGroupPinPost(options);
        };
        this.createPost = async (options = {}) => {
            const postType = util.getPostType(options);
            let sharedUrlObj = undefined;
            let messageTags = undefined;
            if (options.sharedUrl) {
                sharedUrlObj = (0, CaseConverter_1.objectToSnake)(await this.getUrlMetadata({ url: options.sharedUrl }));
            }
            if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
                messageTags = (0, CaseConverter_1.objectToSnake)(util.buildMessageTags(options.text));
                options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
            }
            return await this.postAPI.createPost({
                ...options,
                jwt: await this.getWebSocketToken(),
                postType: postType,
                sharedUrl: sharedUrlObj,
                messageTags: messageTags,
            });
        };
        this.createRepost = async (options) => {
            const postType = util.getPostType(options);
            let sharedUrlObj = undefined;
            let messageTags = undefined;
            if (options.sharedUrl) {
                sharedUrlObj = (0, CaseConverter_1.objectToSnake)(await this.getUrlMetadata({ url: options.sharedUrl }));
            }
            if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
                messageTags = (0, CaseConverter_1.objectToSnake)(util.buildMessageTags(options.text));
                options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
            }
            return this.postAPI.createRepost({
                ...options,
                jwt: await this.getWebSocketToken(),
                postType: postType,
                sharedUrl: sharedUrlObj,
                messageTags: messageTags,
            });
        };
        this.createSharePost = async (options) => {
            return await this.postAPI.createSharePost(options);
        };
        this.createThreadPost = async (options) => {
            const postType = util.getPostType(options);
            let sharedUrlObj = undefined;
            let messageTags = undefined;
            if (options.sharedUrl) {
                sharedUrlObj = (0, CaseConverter_1.objectToSnake)(await this.getUrlMetadata({ url: options.sharedUrl }));
            }
            if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
                messageTags = (0, CaseConverter_1.objectToSnake)(util.buildMessageTags(options.text));
                options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
            }
            return await this.postAPI.createThreadPost({
                ...options,
                jwt: await this.getWebSocketToken(),
                postType: postType,
                sharedUrl: sharedUrlObj,
                messageTags: messageTags,
            });
        };
        this.deleteAllMyPost = async () => {
            return await this.postAPI.deleteAllPost();
        };
        this.unpinGroupPost = async (options) => {
            return await this.postAPI.deleteGroupPinPost(options);
        };
        this.unpinPost = async (options) => {
            return await this.postAPI.deletePinPost(options);
        };
        this.getBookmark = async (options) => {
            return await this.postAPI.getBookmark(options);
        };
        this.getTimelineCalls = async (options = {}) => {
            return await this.postAPI.getCallTimeline(options);
        };
        this.getConversation = async (options) => {
            return await this.postAPI.getConversation(options);
        };
        this.getConversationRootPosts = async (options) => {
            return await this.postAPI.getConversationRootPosts(options);
        };
        this.getFollowingTimelineCalls = async (options = {}) => {
            return await this.postAPI.getFollowingCallTimeline(options);
        };
        this.getFollowingTimeline = async (options = {}) => {
            return await this.postAPI.getFollowingTimeline(options);
        };
        this.getGroupHighlightPosts = async (options) => {
            return await this.postAPI.getGroupHighlightPosts(options);
        };
        this.searchGroupPosts = async (options) => {
            return await this.postAPI.getGroupSearchPosts(options);
        };
        this.getGroupTimeline = async (options) => {
            return await this.postAPI.getGroupTimeline(options);
        };
        this.getTimelineByHashtag = async (options) => {
            return await this.postAPI.getHashtagTimeline(options);
        };
        this.getMyPosts = async (options = {}) => {
            return await this.postAPI.getMyPosts(options);
        };
        this.getPost = async (options) => {
            return await this.postAPI.getPost(options);
        };
        this.getPostLikers = async (options) => {
            return await this.postAPI.getPostLikers(options);
        };
        this.getReposts = async (options) => {
            return await this.postAPI.getPostReposts(options);
        };
        this.getPosts = async (options) => {
            return await this.postAPI.getPosts(options);
        };
        this.getRecentEngagementsPosts = async (options = {}) => {
            return await this.postAPI.getRecentEngagementsPosts(options);
        };
        this.getRecommendedPostTags = async (options) => {
            return await this.postAPI.getRecommendedPostTags(options);
        };
        this.getRecommendedPosts = async (options = {}) => {
            return await this.postAPI.getRecommendedPosts(options);
        };
        this.searchPosts = async (options) => {
            return await this.postAPI.getSearchPosts(options);
        };
        this.getTimeline = async (options) => {
            return await this.postAPI.getTimeline(options);
        };
        this.getUrlMetadata = async (options) => {
            return await this.postAPI.getUrlMetadata(options);
        };
        this.getUserTimeline = async (options) => {
            return await this.postAPI.getUserTimeline(options);
        };
        this.likePost = async (options) => {
            return await this.postAPI.likePosts({ postIds: [options.postId] });
        };
        this.likeMultiplePosts = async (options) => {
            return await this.postAPI.likePosts(options);
        };
        this.removeGroupHighlightPost = async (options) => {
            return await this.postAPI.removeGroupHighlightPost(options);
        };
        this.deletePosts = async (options) => {
            return await this.postAPI.removePosts(options);
        };
        this.reportPost = async (options) => {
            return await this.postAPI.reportPost(options);
        };
        this.unlikePost = async (options) => {
            return await this.postAPI.unlikePost(options);
        };
        this.updatePost = async (options) => {
            let messageTags = undefined;
            if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
                messageTags = (0, CaseConverter_1.objectToSnake)(util.buildMessageTags(options.text));
                options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
            }
            return await this.postAPI.updatePost({ ...options, messageTags: messageTags });
        };
        this.updateRecommendationFeedback = async (options) => {
            return await this.postAPI.updateRecommendationFeedback(options);
        };
        this.validatePost = async (options) => {
            return await this.postAPI.validatePost(options);
        };
        this.viewVideo = async (options) => {
            return await this.postAPI.viewVideo(options);
        };
        this.voteSurvey = async (options) => {
            return await this.postAPI.voteSurvey(options);
        };
        // ReviewAPI
        this.sendReview = async (options) => {
            return await this.reviewAPI.createReview(options);
        };
        this.deleteReviews = async (options) => {
            return await this.reviewAPI.deleteReviews(options);
        };
        this.getMyReviews = async (options = {}) => {
            return await this.reviewAPI.getMyReviews(options);
        };
        this.getReviews = async (options) => {
            return await this.reviewAPI.getReviews(options);
        };
        this.pinReview = async (options) => {
            return await this.reviewAPI.pinReview(options);
        };
        this.unpinReview = async (options) => {
            return await this.reviewAPI.unpinReview(options);
        };
        // ThreadAPI
        // UserAPI
        this.deleteContactFriends = async () => {
            return await this.userAPI.deleteContactFriends();
        };
        this.deleteFootprint = async (options) => {
            return await this.userAPI.deleteFootprint(options);
        };
        this.destroyUser = async () => {
            return await this.userAPI.destroyUser();
        };
        this.followUser = async (options) => {
            return await this.userAPI.followUser(options);
        };
        this.followUsers = async (options) => {
            return await this.userAPI.followUsers(options);
        };
        this.getActiveFollowings = async (options) => {
            return await this.userAPI.getActiveFollowings(options);
        };
        this.getAdditionalSettings = async () => {
            return await this.userAPI.getAdditionalSettings();
        };
        this.getFollowRecommendations = async (options = {}) => {
            return await this.userAPI.getFollowRecommendations(options);
        };
        this.getFollowRequests = async (options = {}) => {
            return await this.userAPI.getFollowRequest(options);
        };
        this.getFollowRequestsCount = async () => {
            return await this.userAPI.getFollowRequestCount();
        };
        this.getFollowingUserBirthdate = async (options = {}) => {
            return await this.userAPI.getFollowingUsersBorn(options);
        };
        this.getFootprints = async (options = {}) => {
            return await this.userAPI.getFootprints(options);
        };
        this.getFreshUser = async (options) => {
            return await this.userAPI.getFreshUser(options);
        };
        this.getHimaUsers = async (options = {}) => {
            return await this.userAPI.getHimaUsers(options);
        };
        this.getRecommendedUsersToFollow = async (options) => {
            return await this.userAPI.getRecommendedUsersToFollowForProfile(options);
        };
        this.getRefreshCounterRequests = async () => {
            return await this.userAPI.getRefreshCounterRequests();
        };
        this.getTimestamp = async () => {
            return await this.userAPI.getTimestamp();
        };
        this.getUser = async (options) => {
            return await this.userAPI.getUser(options);
        };
        this.getUserCustomDefinitions = async () => {
            return await this.userAPI.getUserCustomDefinitions();
        };
        this.getUserEmail = async (options) => {
            return await this.userAPI.getUserEmail(options);
        };
        this.getUserFollowers = async (options) => {
            return await this.userAPI.getUserFollowers(options);
        };
        this.getUserFollowings = async (options) => {
            return await this.userAPI.getUserFollowings(options);
        };
        this.getUserFromQr = async (options) => {
            return await this.userAPI.getUserFromQr(options);
        };
        this.getUserWithCallUserId = async (options) => {
            return await this.userAPI.getUserWithCallUserId(options);
        };
        this.getUserWithoutLeavingFootprint = async (options) => {
            return await this.userAPI.getUserWithoutLeavingFootprint(options);
        };
        this.getUsers = async (options) => {
            return await this.userAPI.getUsers({
                ...options,
                jwt: await this.getWebSocketToken(),
            });
        };
        this.getUsersFromUuid = async (options) => {
            return await this.userAPI.getUsersFromUuid(options);
        };
        this.refreshProfileCounter = async (options) => {
            return await this.userAPI.refreshCounter(options);
        };
        this.reg = async (options) => {
            return await this.userAPI.reg(options);
        };
        this.removeUserAvatar = async () => {
            return await this.userAPI.removeUserAvatar();
        };
        this.removeUserCover = async () => {
            return await this.userAPI.removeUserCover();
        };
        this.reportUser = async (options) => {
            return await this.userAPI.reportUser(options);
        };
        this.resetPassword = async (options) => {
            return await this.userAPI.resetPassword(options);
        };
        this.searchLobiUsers = async (options = {}) => {
            return await this.userAPI.searchLobiUsers(options);
        };
        this.searchUsers = async (options) => {
            return await this.userAPI.searchUsers(options);
        };
        this.setAdditionalUserSettingEnabled = async (options) => {
            return await this.userAPI.setAdditionalSettingEnabled(options);
        };
        this.setFollowPermissionEnabled = async (options) => {
            return await this.userAPI.setFollowPermissionEnabled(options);
        };
        this.setSettingFollowRecommendationEnabled = async (options) => {
            return await this.userAPI.setSettingFollowRecommendationEnabled(options);
        };
        this.takeActionFollowRequest = async (options) => {
            return await this.userAPI.takeActionFollowRequest(options);
        };
        this.turnOnHima = async () => {
            return await this.userAPI.turnOnHima();
        };
        this.unfollowUser = async (options) => {
            return await this.userAPI.unfollowUser(options);
        };
        this.updateLanguage = async (options) => {
            return await this.userAPI.updateLanguage(options);
        };
        this.editUser = async (options) => {
            return await this.userAPI.updateUser(options);
        };
        this.uploadTwitterFriendIds = async (options) => {
            return await this.userAPI.uploadTwitterFriendIds(options);
        };
    }
}
exports.Client = Client;
