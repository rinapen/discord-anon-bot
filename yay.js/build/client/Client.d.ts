import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { ActiveFollowingsResponse, ActivitiesResponse, AdditionalSettingsResponse, ApplicationConfigResponse, BanWordsResponse, BgmsResponse, BlockedUsersResponse, BookmarkPostResponse, CallStatusResponse, ChatRoomResponse, ChatRoomsResponse, ConferenceCallResponse, CreateChatRoomResponse, CreateGroupResponse, CreatePostResponse, CreateQuotaResponse, CreateUserResponse, EmailVerificationPresignedUrlResponse, FollowRecommendationsResponse, FollowRequestCountResponse, FollowUsersResponse, FootprintsResponse, GamesResponse, GenresResponse, GroupCategoriesResponse, GroupNotificationSettingsResponse, GroupResponse, GroupUsersResponse, GroupsRelatedResponse, GroupsResponse, HiddenResponse, HimaUsersResponse, LikePostsResponse, LoginUpdateResponse, LoginUserResponse, MessageResponse, MessagesResponse, NotificationSettingResponse, PolicyAgreementsResponse, PopularWordsResponse, PostLikersResponse, PostResponse, PostTagsResponse, PostsResponse, PresignedUrlResponse, PresignedUrlsResponse, PromotionsResponse, RefreshCounterRequestsResponse, ReviewsResponse, StickerPacksResponse, TokenResponse, TotalChatRequestResponse, UnreadStatusResponse, UserCustomDefinitionsResponse, UserEmailResponse, UserResponse, UserTimestampResponse, UsersByTimestampResponse, UsersResponse, ValidationPostResponse, VerifyDeviceResponse, VipGameRewardUrlResponse, VoteSurveyResponse } from '../util/Responses';
import { GifImageCategory, GroupUser, MuteKeyword, Post, SharedUrl, Walkthrough } from '../util/Models';
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
export declare class Client extends BaseClient {
    constructor(options?: ClientOptions);
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
    changeEmail: (options: {
        email: string;
        password: string;
        emailGrantToken?: string;
    }) => Promise<LoginUpdateResponse>;
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
    changePassword: (options: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<LoginUpdateResponse>;
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
    getToken: (options: {
        grantType: string;
        email?: string;
        password?: string;
        refreshToken?: string;
    }) => Promise<TokenResponse>;
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
    login: (options: {
        email: string;
        password: string;
    }) => Promise<LoginUserResponse>;
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
    logout: () => Promise<any>;
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
    migrateToken: (options: {
        token: string;
    }) => Promise<any>;
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
    resendConfirmEmail: () => Promise<any>;
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
    restoreUser: (options: {
        userId: number;
    }) => Promise<any>;
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
    revokeDeviceTokens: () => Promise<any>;
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
    saveAccountWithEmail: (options: {
        email: string;
        password?: string;
        currentPassword?: string;
        emailGrantToken?: string;
    }) => Promise<any>;
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
    blockUser: (options: {
        userId: number;
    }) => Promise<any>;
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
    getBlockedUserIds: () => Promise<number[]>;
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
    getBlockedUsers: (options?: {
        nickname?: string;
        username?: string;
        biography?: string;
        prefecture?: string;
        gender?: number;
        fromId?: number;
    }) => Promise<BlockedUsersResponse>;
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
    unblockUser: (options: {
        userId: number;
    }) => Promise<any>;
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
    bumpCall: (options: {
        callId: number;
        participantLimit?: number;
    }) => Promise<any>;
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
    getUserActiveCall: (options: {
        userId: number;
    }) => Promise<PostResponse>;
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
    getBgms: () => Promise<BgmsResponse>;
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
    getCall: (options: {
        callId: number;
    }) => Promise<ConferenceCallResponse>;
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
    getCallInvitableUsers: (options: {
        callId: number;
        fromTimestamp?: number;
        nickname?: string;
    }) => Promise<UsersByTimestampResponse>;
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
    getCallStatus: (options: {
        opponentId: number;
    }) => Promise<CallStatusResponse>;
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
    getGames: (options: {
        number: number;
        gameIds: number[];
        fromId?: number;
    }) => Promise<GamesResponse>;
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
    getGenres: (options: {
        number: number;
        from: number;
    }) => Promise<GenresResponse>;
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
    getGroupCalls: (options?: {
        number?: number;
        groupCategoryId?: number;
        fromTimestamp?: number;
        scope?: string;
    }) => Promise<PostsResponse>;
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
    inviteOnlineUsersToCall: (options: {
        callId: number;
        groupId?: number;
    }) => Promise<any>;
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
    inviteUsersToCall: (options: {
        callId: number;
        userIds: number[];
    }) => Promise<any>;
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
    inviteUsersToChatCall: (options?: {
        chatRoomId?: number;
        roomId?: number;
        roomUrl?: string;
    }) => Promise<any>;
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
    banUserFromCall: (options: {
        callId: number;
        userId: number;
    }) => Promise<any>;
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
    notifyAnonymousUserLeaveCall: (options: {
        conferenceId: number;
        agoraUid: string;
    }) => Promise<any>;
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
    notifyUserLeaveCall: (options: {
        conferenceId: number;
        userId: number;
    }) => Promise<any>;
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
    sendCallScreenshot: (options: {
        screenshotFilename: string;
        conferenceId: number;
    }) => Promise<any>;
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
    startCall: (options: {
        callId: number;
        joinableBy: string;
        gameTitle?: string;
        categoryId?: string;
    }) => Promise<any>;
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
    setCallUserRole: (options: {
        callId: number;
        userId: number;
        role: string;
    }) => Promise<any>;
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
    joinCall: (options: {
        conferenceId: number;
        callSid?: string;
    }) => Promise<ConferenceCallResponse>;
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
    leaveCall: (options: {
        conferenceId: number;
        callSid?: string;
    }) => Promise<any>;
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
    joinCallAsAnonymous: (options: {
        conferenceId: number;
        AgoraUid?: string;
    }) => Promise<ConferenceCallResponse>;
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
    leaveCallAsAnonymous: (options: {
        conferenceId: number;
        AgoraUid?: string;
    }) => Promise<any>;
    acceptChatRequest: (options: {
        roomIds: number[];
    }) => Promise<any>;
    checkChatUnreadStatus: (options?: {
        fromTime?: number;
    }) => Promise<UnreadStatusResponse>;
    createGroupChat: (options: {
        name: string;
        withUserIds: number[];
        iconFilename?: string;
        backgroundFilename?: string;
    }) => Promise<CreateChatRoomResponse>;
    createPrivateChat: (options: {
        withUserId: number;
        matchingId?: number;
        himaChat?: boolean;
    }) => Promise<CreateChatRoomResponse>;
    deleteChatBackground: (options: {
        roomId: number;
    }) => Promise<any>;
    deleteMessage: (options: {
        roomId: number;
        messageId: number;
    }) => Promise<any>;
    editChatRoom: (options: {
        roomId: number;
        name?: number;
        iconFilename?: string;
        backgroundFilename?: string;
    }) => Promise<any>;
    getChatableUsers: (options?: {
        fromFollowId?: number;
        fromTimestamp?: number;
        orderBy?: string;
    }) => Promise<FollowUsersResponse>;
    getChatGifs: () => Promise<GifImageCategory[]>;
    getHiddenChatRooms: (options?: {
        number?: number;
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getMainChatRooms: (options?: {
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getMessages: (options: {
        roomId: number;
        number?: number;
        fromMessageId?: number;
        toMessageId?: number;
    }) => Promise<MessagesResponse>;
    getChatNotificationSettings: (options: {
        roomId: number;
    }) => Promise<AdditionalSettingsResponse>;
    getChatRequests: (options?: {
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getChatRoom: (options: {
        roomId: number;
    }) => Promise<ChatRoomResponse>;
    getStickerPacks: () => Promise<StickerPacksResponse>;
    getTotalChatRequests: () => Promise<TotalChatRequestResponse>;
    hideChatRoom: (options: {
        roomId: number;
    }) => Promise<any>;
    inviteUsersToChatRoom: (options: {
        roomId: number;
        withUserIds: number[];
    }) => Promise<any>;
    kickUsersFromChatRoom: (options: {
        roomId: number;
        withUserIds: number[];
    }) => Promise<any>;
    pinChatRoom: (options: {
        roomId: number;
    }) => Promise<any>;
    readMessageAttachment: (options: {
        roomId: number;
        attachmentMsgIds: number[];
    }) => Promise<any>;
    readMessage: (options: {
        roomId: number;
        messageId: number;
    }) => Promise<any>;
    readVideoMessage: (options: {
        roomId: number;
        videoMsgIds: number;
    }) => Promise<any>;
    refreshChatRooms: (options?: {
        fromTime?: number;
    }) => Promise<ChatRoomsResponse>;
    removeChatRooms: (options: {
        roomIds: number[];
    }) => Promise<any>;
    reportChatRoom: (options: {
        roomId: number;
        categoryId: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    sendChatRoomMediaScreenshotNotification: (options: {
        roomId: number;
    }) => Promise<any>;
    sendMessage: (options: {
        roomId: number;
        messageType?: string;
        callType?: string;
        text?: string;
        fontSize?: number;
        gifImageId?: number;
        attachmentFileName?: string;
        stickerPackId?: number;
        stickerId?: number;
        videoFileName?: string;
        parentId?: string;
    }) => Promise<MessageResponse>;
    setChatRoomNotificationSettings: (options: {
        roomId: number;
        notificationChat: number;
    }) => Promise<NotificationSettingResponse>;
    unhideChatRooms: (options: {
        roomIds: number[];
    }) => Promise<any>;
    unpinChatRoom: (options: {
        roomId: number;
    }) => Promise<any>;
    getAppConfig: () => Promise<ApplicationConfigResponse>;
    getBanWords: (options: {
        countryApiValue: string;
    }) => Promise<BanWordsResponse>;
    getPopularWords: (options: {
        countryApiValue: string;
    }) => Promise<PopularWordsResponse>;
    getWalkthroughs: (options: {
        appId: number;
    }) => Promise<Walkthrough[]>;
    requestWalkthrough: (options: {
        groupId: number;
    }) => Promise<any>;
    acceptGroupModeratorOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    acceptGroupOwnershipOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    acceptGroupJoinRequest: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    addRelatedGroups: (options: {
        groupId: number;
        relatedGroupId: number;
    }) => Promise<any>;
    banGroupUser: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    checkGroupUnreadStatus: (options: {
        fromTime: number;
    }) => Promise<UnreadStatusResponse>;
    createGroup: (options: {
        topic: string;
        description?: string;
        secret?: string;
        hideReportedPosts?: boolean;
        hideConferenceCall?: boolean;
        isPrivate?: boolean;
        onlyVerifiedAge?: boolean;
        onlyMobileVerified?: boolean;
        callTimelineDisplay?: boolean;
        allowOwnershipTransfer?: boolean;
        allowThreadCreationBy?: string;
        gender?: number;
        generationGroupsLimit?: number;
        groupCategoryId?: number;
        coverImageFilename?: string;
        groupIconFilename?: string;
        subCategoryId?: string;
        hideFromGameEight?: boolean;
        allowMembersToPostImageAndVideo?: boolean;
        allowMembersToPostUrl?: boolean;
        guidelines?: string;
    }) => Promise<CreateGroupResponse>;
    pinGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    declineGroupModeratorOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    declineGroupOwnershipOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    declineGroupJoinRequest: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    deleteGroupCover: (options: {
        groupId: number;
    }) => Promise<any>;
    deleteGroupIcon: (options: {
        groupId: number;
    }) => Promise<any>;
    unpinGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    getBannedGroupMembers: (options: {
        groupId: number;
        page?: number;
    }) => Promise<UsersResponse>;
    getGroupCategories: (options: {
        page?: number;
        number?: number;
    }) => Promise<GroupCategoriesResponse>;
    getGroupCreateQuota: () => Promise<CreateQuotaResponse>;
    getGroup: (options: {
        groupId: number;
    }) => Promise<GroupResponse>;
    getGroupNotificationSettings: (options: {
        groupId: number;
    }) => Promise<GroupNotificationSettingsResponse>;
    getGroups: (options: {
        groupCategoryId?: number;
        keyword?: string;
        fromTimestamp?: number;
        subCategoryId?: number;
    }) => Promise<GroupsResponse>;
    getGroupInvitableUsers: (options: {
        groupId: number;
        fromTimestamp?: number;
        nickname?: string;
    }) => Promise<UsersByTimestampResponse>;
    getGroupJoinedStatuses: (options: {
        groupIds: number[];
    }) => Promise<Record<string, string>>;
    getGroupMember: (options: {
        groupId: number;
        userId: number;
    }) => Promise<GroupUser>;
    getGroupMembers: (options: {
        groupId: number;
        mode?: string;
        keyword?: string;
        fromId?: number;
        fromTimestamp?: number;
        orderBy?: string;
        followedByMe?: boolean;
    }) => Promise<GroupUsersResponse>;
    getMyGroups: (options: {
        fromTimestamp?: number;
    }) => Promise<GroupsResponse>;
    getRelatableGroups: (options: {
        groupId: number;
        keyword?: string;
        from?: string;
    }) => Promise<GroupsRelatedResponse>;
    getJoinedGroups: (options: {
        userId: number;
        page?: number;
    }) => Promise<GroupsResponse>;
    inviteUsersToGroup: (options: {
        groupId: number;
        userIds: number[];
    }) => Promise<any>;
    joinGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    leaveGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    removeGroupModerator: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
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
    removeRelatedGroups: (options: {
        groupId: number;
        relatedGroupIds: number[];
    }) => Promise<any>;
    reportGroup: (options: {
        groupId: number;
        categoryId: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    sendGroupModeratorOffers: (options: {
        groupId: number;
        userIds: number[];
    }) => Promise<any>;
    sendGroupOwnershipOffer: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    setGroupNotificationSettings: (options: {
        groupId: number;
        notificationGroupPost?: number;
        notificationGroupJoin?: number;
        notificationGroupRequest?: number;
        notificationGroupMessageTagAll?: number;
    }) => Promise<AdditionalSettingsResponse>;
    setGroupTitle: (options: {
        groupId: number;
        title: string;
    }) => Promise<any>;
    takeoverGroupOwnership: (options: {
        groupId: number;
    }) => Promise<any>;
    unbanGroupUser: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    editGroup: (options: {
        groupId: number;
        topic?: string;
        description?: string;
        secret?: boolean;
        hideReportedPosts?: boolean;
        hideConferenceCall?: boolean;
        isPrivate?: boolean;
        onlyVerifiedAge?: boolean;
        onlyMobileVerified?: boolean;
        callTimelineDisplay?: boolean;
        allowOwnershipTransfer?: boolean;
        allowThreadCreationBy?: string;
        gender?: number;
        generationGroupsLimit?: number;
        groupCategoryId?: number;
        coverImageFilename?: string;
        groupIconFilename?: string;
        subCategoryId?: string;
        hideFromGameEight?: boolean;
        allowMembersToPostImageAndVideo?: boolean;
        allowMembersToPostUrl?: boolean;
        guidelines?: string;
    }) => Promise<GroupResponse>;
    visitGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    withdrawGroupModeratorOffer: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    withdrawGroupOwnershipOffer: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    getMutedUsers: (options: {
        from?: string;
        number?: number;
    }) => Promise<HiddenResponse>;
    muteUser: (options: {
        userId: number;
    }) => Promise<any>;
    unmuteUsers: (options: {
        userIds: number[];
    }) => Promise<any>;
    acceptPolicyAgreement: (options: {
        type: string;
    }) => Promise<any>;
    getEmailGrantToken: (options: {
        email: string;
        code: string;
    }) => Promise<string>;
    getEmailVerificationPresignedUrl: (options: {
        email: string;
        locale: string;
        intent?: string;
    }) => Promise<EmailVerificationPresignedUrlResponse>;
    getFileUploadPresignedUrls: (options: {
        filenames: string[];
    }) => Promise<PresignedUrlsResponse>;
    getVideoFileUploadPresignedUrl: (options: {
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
    getWebSocketToken: () => Promise<string>;
    svc: (options: {
        email: string;
        locale: string;
    }) => Promise<any>;
    verifyDevice: (options: {
        platform: string;
        verificationString: string;
    }) => Promise<VerifyDeviceResponse>;
    muteKeyword: (options: {
        word: string;
        context: string[];
    }) => Promise<MuteKeyword>;
    deleteMutedKeyword: (options: {
        keywordIds: number[];
    }) => Promise<any>;
    getMutedKeywords: () => Promise<MuteKeyword[]>;
    editMutedKeyword: (options: {
        keywordId: number;
        word: string;
        context: string[];
    }) => Promise<MuteKeyword>;
    getNotifications: (options?: {
        important?: boolean;
        fromTimestamp?: number;
        number?: number;
    }) => Promise<ActivitiesResponse>;
    getMergedNotifications: (options?: {
        fromTimestamp?: number;
    }) => Promise<ActivitiesResponse>;
    receivedNotification: (options: {
        pid: string;
        type: string;
        openedAt?: number;
    }) => Promise<any>;
    addBookmark: (options: {
        userId: number;
        postId: number;
    }) => Promise<BookmarkPostResponse>;
    addGroupHighlightPost: (options: {
        groupId: number;
        postId: number;
    }) => Promise<BookmarkPostResponse>;
    createGroupCallPost: (options?: {
        text?: string;
        fontSize?: number;
        color?: number;
        groupId?: number;
        callType?: string;
        categoryId?: number;
        gameTitle?: string;
        joinableBy?: string;
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
    }) => Promise<CreatePostResponse>;
    pinGroupPost: (options: {
        postId: number;
        groupId: number;
    }) => Promise<any>;
    createPost: (options?: {
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: string;
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<Post>;
    createRepost: (options: {
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: string;
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<CreatePostResponse>;
    createSharePost: (options: {
        shareableType: string;
        shareableId: number;
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        groupId?: number;
    }) => Promise<Post>;
    createThreadPost: (options: {
        threadId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: string;
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<Post>;
    deleteAllMyPost: () => Promise<any>;
    unpinGroupPost: (options: {
        groupId: number;
    }) => Promise<any>;
    unpinPost: (options: {
        postId: number;
    }) => Promise<any>;
    getBookmark: (options: {
        userId: number;
        from?: string;
    }) => Promise<PostsResponse>;
    getTimelineCalls: (options?: {
        groupId?: number;
        fromTimestamp?: number;
        number?: number;
        categoryId?: number;
        callType?: string;
        includeCircleCall?: boolean;
        crossGeneration?: boolean;
        excludeRecentGomimushi?: boolean;
        sharedInterestCategories?: boolean;
    }) => Promise<PostsResponse>;
    getConversation: (options: {
        conversationId: number;
        groupId?: number;
        threadId?: number;
        fromPostId?: number;
        reverse?: boolean;
    }) => Promise<PostsResponse>;
    getConversationRootPosts: (options: {
        postIds: number[];
    }) => Promise<PostsResponse>;
    getFollowingTimelineCalls: (options?: {
        fromTimestamp?: number;
        number?: number;
        categoryId?: number;
        callType?: string;
        includeCircleCall?: boolean;
        excludeRecentGomimushi?: boolean;
    }) => Promise<PostsResponse>;
    getFollowingTimeline: (options?: {
        from?: string;
        fromPostId?: number;
        onlyRoot?: boolean;
        orderBy?: string;
        number?: number;
        mxn?: number;
        reduceSelfie?: boolean;
        customGenerationRange?: boolean;
    }) => Promise<PostsResponse>;
    getGroupHighlightPosts: (options: {
        groupId: number;
        from?: string;
        number?: number;
    }) => Promise<PostsResponse>;
    searchGroupPosts: (options: {
        groupId: number;
        keyword: string;
        fromPostId?: number;
        number?: number;
        onlyThreadPosts?: boolean;
    }) => Promise<PostsResponse>;
    getGroupTimeline: (options: {
        groupId: number;
        fromPostId?: number;
        reverse?: boolean;
        postType?: string;
        number?: number;
        onlyRoot?: boolean;
    }) => Promise<PostsResponse>;
    getTimelineByHashtag: (options: {
        tag: number;
        fromPostId?: number;
        number?: number;
    }) => Promise<PostsResponse>;
    getMyPosts: (options?: {
        fromPostId?: number;
        number?: number;
        includeGroupPost?: boolean;
    }) => Promise<PostsResponse>;
    getPost: (options: {
        postId: number;
    }) => Promise<PostResponse>;
    getPostLikers: (options: {
        postId: number;
        fromId?: number;
    }) => Promise<PostLikersResponse>;
    getReposts: (options: {
        postId: number;
        fromPostId?: number;
    }) => Promise<PostsResponse>;
    getPosts: (options: {
        postIds: number[];
    }) => Promise<PostsResponse>;
    getRecentEngagementsPosts: (options?: {
        number?: number;
    }) => Promise<PostsResponse>;
    getRecommendedPostTags: (options: {
        tag: string;
        saveRecentSearch?: boolean;
    }) => Promise<PostTagsResponse>;
    getRecommendedPosts: (options?: {
        experimentNum?: number;
        variantNum?: number;
        number?: number;
        saveRecentSearch?: boolean;
    }) => Promise<PostsResponse>;
    searchPosts: (options: {
        keyword: string;
        postOwnerScope: number;
        onlyMedia?: boolean;
        fromPostId?: number;
        number?: number;
    }) => Promise<PostsResponse>;
    getTimeline: (options: {
        noreplyMode: boolean;
        orderBy: string;
        experimentOlderAgeRules?: boolean;
        sharedInterestCategories?: boolean;
        from?: string;
        fromPostId?: number;
        number?: number;
        mxn?: number;
        en?: number;
        vn?: number;
        reduceSelfie?: boolean;
        customGenerationRange?: boolean;
    }) => Promise<PostsResponse>;
    getUrlMetadata: (options: {
        url: string;
    }) => Promise<SharedUrl>;
    getUserTimeline: (options: {
        userId: number;
        fromPostId?: number;
        postType?: string;
        number?: number;
    }) => Promise<PostsResponse>;
    likePost: (options: {
        postId: number;
    }) => Promise<LikePostsResponse>;
    likeMultiplePosts: (options: {
        postIds: number[];
    }) => Promise<LikePostsResponse>;
    removeGroupHighlightPost: (options: {
        groupId: number;
        postId: number;
    }) => Promise<any>;
    deletePosts: (options: {
        postIds: number[];
    }) => Promise<any>;
    reportPost: (options: {
        postId: number;
        categoryId?: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    unlikePost: (options: {
        postId: number;
    }) => Promise<any>;
    updatePost: (options: {
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
    }) => Promise<Post>;
    updateRecommendationFeedback: (options: {
        postId: number;
        experimentNum?: number;
        variantNum?: number;
        feedbackResult: string;
    }) => Promise<any>;
    validatePost: (options: {
        text: string;
        groupId?: number;
        threadId?: number;
    }) => Promise<ValidationPostResponse>;
    viewVideo: (options: {
        videoId: number;
    }) => Promise<any>;
    voteSurvey: (options: {
        surveyId: number;
        choiceId: number;
    }) => Promise<VoteSurveyResponse>;
    sendReview: (options: {
        userId: number;
        comment: string;
    }) => Promise<any>;
    deleteReviews: (options: {
        reviewIds: number[];
    }) => Promise<any>;
    getMyReviews: (options?: {
        fromId?: number;
    }) => Promise<ReviewsResponse>;
    getReviews: (options: {
        userId: number;
        fromId?: number;
    }) => Promise<ReviewsResponse>;
    pinReview: (options: {
        reviewId: number;
    }) => Promise<any>;
    unpinReview: (options: {
        reviewId: number;
    }) => Promise<any>;
    deleteContactFriends: () => Promise<any>;
    deleteFootprint: (options: {
        userId: number;
        footprintId: number;
    }) => Promise<any>;
    destroyUser: () => Promise<any>;
    followUser: (options: {
        userId: number;
    }) => Promise<any>;
    followUsers: (options: {
        userIds: number[];
    }) => Promise<any>;
    getActiveFollowings: (options: {
        onlyOnline: boolean;
        fromLoggedinAt?: number;
    }) => Promise<ActiveFollowingsResponse>;
    getAdditionalSettings: () => Promise<AdditionalSettingsResponse>;
    getFollowRecommendations: (options?: {
        fromTimestamp?: number;
        number?: number;
        sources?: string[];
    }) => Promise<FollowRecommendationsResponse>;
    getFollowRequests: (options?: {
        fromTimestamp?: number;
    }) => Promise<UsersByTimestampResponse>;
    getFollowRequestsCount: () => Promise<FollowRequestCountResponse>;
    getFollowingUserBirthdate: (options?: {
        birthdate?: string;
    }) => Promise<UsersResponse>;
    getFootprints: (options?: {
        fromId?: number;
        number?: number;
        mode?: string;
    }) => Promise<FootprintsResponse>;
    getFreshUser: (options: {
        userId: number;
    }) => Promise<UserResponse>;
    getHimaUsers: (options?: {
        fromHimaId?: number;
        number?: number;
    }) => Promise<HimaUsersResponse>;
    getRecommendedUsersToFollow: (options: {
        userId: number;
        number?: number;
        page?: number;
    }) => Promise<UsersResponse>;
    getRefreshCounterRequests: () => Promise<RefreshCounterRequestsResponse>;
    getTimestamp: () => Promise<UserTimestampResponse>;
    getUser: (options: {
        userId: number;
    }) => Promise<UserResponse>;
    getUserCustomDefinitions: () => Promise<UserCustomDefinitionsResponse>;
    getUserEmail: (options: {
        userId: number;
    }) => Promise<UserEmailResponse>;
    getUserFollowers: (options: {
        userId: number;
        fromFollowId?: number;
        followedByMe?: boolean;
        nickname?: string;
    }) => Promise<FollowUsersResponse>;
    getUserFollowings: (options: {
        userId: number;
        fromFollowId?: number;
        fromTimestamp?: boolean;
        orderBy?: string;
    }) => Promise<FollowUsersResponse>;
    getUserFromQr: (options: {
        qr: string;
    }) => Promise<UserResponse>;
    getUserWithCallUserId: (options: {
        callId: number;
        callUserId: string;
    }) => Promise<UserResponse>;
    getUserWithoutLeavingFootprint: (options: {
        userId: number;
    }) => Promise<UserResponse>;
    getUsers: (options: {
        userIds: number[];
    }) => Promise<UsersResponse>;
    getUsersFromUuid: (options: {
        uuid: string;
    }) => Promise<UsersResponse>;
    refreshProfileCounter: (options: {
        counter: string;
    }) => Promise<any>;
    reg: (options: {
        nickname: string;
        biography?: string;
        birthDate: string;
        gender: number;
        countryCode: string;
        prefecture?: string;
        profileIconFilename?: string;
        coverImageFilename?: string;
        email?: string;
        password?: string;
        emailGrantToken?: string;
        en?: number;
        vn?: number;
    }) => Promise<CreateUserResponse>;
    removeUserAvatar: () => Promise<any>;
    removeUserCover: () => Promise<any>;
    reportUser: (options: {
        userId: number;
        categoryId: number;
        reason?: string;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    resetPassword: (options: {
        email: string;
        emailGrantToken: string;
        password: string;
    }) => Promise<any>;
    searchLobiUsers: (options?: {
        nickname?: string;
        number?: number;
        from?: string;
    }) => Promise<UsersResponse>;
    searchUsers: (options: {
        gender?: number;
        nickname?: string;
        title?: string;
        biography?: string;
        fromTimestamp?: number;
        similarAge?: boolean;
        notRecentGomimushi?: boolean;
        recentlyCreated?: boolean;
        samePrefecture?: boolean;
        prefecture?: string;
        saveRecentSearch?: boolean;
        number?: number;
        page?: number;
    }) => Promise<UsersResponse>;
    setAdditionalUserSettingEnabled: (options: {
        mode: string;
        on?: number;
    }) => Promise<any>;
    setFollowPermissionEnabled: (options: {
        nickname: string;
        isPrivate?: boolean;
    }) => Promise<any>;
    setSettingFollowRecommendationEnabled: (options: {
        on: boolean;
    }) => Promise<any>;
    takeActionFollowRequest: (options: {
        userId: number;
        action: string;
    }) => Promise<any>;
    turnOnHima: () => Promise<any>;
    unfollowUser: (options: {
        userId: number;
    }) => Promise<any>;
    updateLanguage: (options: {
        language: string;
    }) => Promise<any>;
    editUser: (options: {
        nickname: string;
        username?: string;
        biography?: string;
        prefecture?: string;
        gender?: number;
        countryCode?: string;
        profileIconFilename?: string;
        coverImageFilename?: string;
    }) => Promise<any>;
    uploadTwitterFriendIds: (options: {
        twitterFriendIds: string[];
    }) => Promise<any>;
}
