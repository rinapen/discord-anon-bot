import { BaseClient } from '../client/BaseClient';
import { AdditionalSettingsResponse, ChatRoomResponse, ChatRoomsResponse, CreateChatRoomResponse, FollowUsersResponse, GifsDataResponse, MessageResponse, MessagesResponse, NotificationSettingResponse, StickerPacksResponse, TotalChatRequestResponse, UnreadStatusResponse } from '../util/Responses';
/**
 * **チャットAPI**
 *
 * @remarks
 * チャットルームAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class ChatAPI {
    private readonly base;
    constructor(base: BaseClient);
    acceptRequest: (options: {
        roomIds: number[];
    }) => Promise<any>;
    checkUnreadStatus: (options?: {
        fromTime?: number;
    }) => Promise<UnreadStatusResponse>;
    createGroup: (options: {
        name: string;
        withUserIds: number[];
        iconFilename?: string;
        backgroundFilename?: string;
    }) => Promise<CreateChatRoomResponse>;
    createPrivate: (options: {
        withUserId: number;
        matchingId?: number;
        himaChat?: boolean;
    }) => Promise<CreateChatRoomResponse>;
    deleteBackground: (options: {
        roomId: number;
    }) => Promise<any>;
    deleteMessage: (options: {
        roomId: number;
        messageId: number;
    }) => Promise<any>;
    edit: (options: {
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
    getGifsData: () => Promise<GifsDataResponse>;
    getHiddenChatRooms: (options?: {
        number?: number;
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getMainRooms: (options?: {
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getMessages: (options: {
        roomId: number;
        number?: number;
        fromMessageId?: number;
        toMessageId?: number;
    }) => Promise<MessagesResponse>;
    getNotificationSettings: (options: {
        roomId: number;
    }) => Promise<AdditionalSettingsResponse>;
    getRequestRooms: (options?: {
        fromTimestamp?: number;
    }) => Promise<ChatRoomsResponse>;
    getRoom: (options: {
        roomId: number;
    }) => Promise<ChatRoomResponse>;
    getStickerPacks: () => Promise<StickerPacksResponse>;
    getTotalRequests: () => Promise<TotalChatRequestResponse>;
    hideChat: (options: {
        roomId: number;
    }) => Promise<any>;
    invite: (options: {
        roomId: number;
        withUserIds: number[];
    }) => Promise<any>;
    kickUsers: (options: {
        roomId: number;
        withUserIds: number[];
    }) => Promise<any>;
    pin: (options: {
        roomId: number;
    }) => Promise<any>;
    readAttachment: (options: {
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
    refreshRooms: (options?: {
        fromTime?: number;
    }) => Promise<ChatRoomsResponse>;
    remove: (options: {
        roomIds: number[];
    }) => Promise<any>;
    report: (options: {
        roomId: number;
        categoryId: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    sendMediaScreenshotNotification: (options: {
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
    setNotificationSettings: (options: {
        roomId: number;
        notificationChat: number;
    }) => Promise<NotificationSettingResponse>;
    unHideChat: (options: {
        roomIds: number[];
    }) => Promise<any>;
    unpin: (options: {
        roomId: number;
    }) => Promise<any>;
}
