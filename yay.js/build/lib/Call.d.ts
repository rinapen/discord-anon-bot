import { BaseClient } from '../client/BaseClient';
import { PostResponse, BgmsResponse, ConferenceCallResponse, UsersByTimestampResponse, CallStatusResponse, GamesResponse, GenresResponse, PostsResponse } from '../util/Responses';
/**
 * **通話API**
 *
 * @remarks
 * 通話APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class CallAPI {
    private readonly base;
    constructor(base: BaseClient);
    bumpCall: (options: {
        callId: number;
        participantLimit?: number;
    }) => Promise<any>;
    getActiveCall: (options: {
        userId: number;
    }) => Promise<PostResponse>;
    getBgms: () => Promise<BgmsResponse>;
    getCall: (options: {
        callId: number;
    }) => Promise<ConferenceCallResponse>;
    getCallInvitableUsers: (options: {
        callId: number;
        fromTimestamp?: number;
        nickname?: string;
    }) => Promise<UsersByTimestampResponse>;
    getCallStatus: (options: {
        opponentId: number;
    }) => Promise<CallStatusResponse>;
    getGames: (options: {
        number: number;
        gameIds: number[];
        fromId?: number;
    }) => Promise<GamesResponse>;
    getGenres: (options: {
        number: number;
        from: number;
    }) => Promise<GenresResponse>;
    getGroupCalls: (options?: {
        number?: number;
        groupCategoryId?: number;
        fromTimestamp?: number;
        scope?: string;
    }) => Promise<PostsResponse>;
    inviteToCallBulk: (options: {
        callId: number;
        groupId?: number;
    }) => Promise<any>;
    inviteUsersToCall: (options: {
        callId: number;
        userIds: number[];
    }) => Promise<any>;
    inviteUsersToChatCall: (options?: {
        chatRoomId?: number;
        roomId?: number;
        roomUrl?: string;
    }) => Promise<any>;
    kickAndBanFromCall: (options: {
        callId: number;
        userId: number;
    }) => Promise<any>;
    notifyAnonymousUserLeaveAgoraChannel: (options: {
        conferenceId: number;
        agoraUid: string;
    }) => Promise<any>;
    notifyUserLeaveAgoraChannel: (options: {
        conferenceId: number;
        userId: number;
    }) => Promise<any>;
    sendCallScreenshot: (options: {
        screenshotFilename: string;
        conferenceId: number;
    }) => Promise<any>;
    setCall: (options: {
        callId: number;
        joinableBy: string;
        gameTitle?: string;
        categoryId?: string;
    }) => Promise<any>;
    setUserRole: (options: {
        callId: number;
        userId: number;
        role: string;
    }) => Promise<any>;
    startCall: (options: {
        conferenceId: number;
        callSid?: string;
    }) => Promise<ConferenceCallResponse>;
    stopCall: (options: {
        conferenceId: number;
        callSid?: string;
    }) => Promise<any>;
    startAnonymousCall: (options: {
        conferenceId: number;
        AgoraUid?: string;
    }) => Promise<ConferenceCallResponse>;
    stopAnonymousCall: (options: {
        conferenceId: number;
        AgoraUid?: string;
    }) => Promise<any>;
}
