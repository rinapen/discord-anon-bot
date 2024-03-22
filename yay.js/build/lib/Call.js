"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallAPI = void 0;
/**
 * **通話API**
 *
 * @remarks
 * 通話APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class CallAPI {
    constructor(base) {
        this.base = base;
        this.bumpCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/${options.callId}/bump`,
                requireAuth: true,
                params: { participant_limit: options.participantLimit },
            });
        };
        this.getActiveCall = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/posts/active_call`,
                requireAuth: false,
                params: { user_id: options.userId },
            });
        };
        this.getBgms = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/calls/bgm`,
                requireAuth: false,
            });
        };
        this.getCall = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/calls/conferences/${options.callId}`,
                requireAuth: false,
            });
        };
        this.getCallInvitableUsers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/calls/${options.callId}/users/invitable`,
                requireAuth: false,
                params: { from_timestamp: options.fromTimestamp, nickname: options.nickname },
            });
        };
        this.getCallStatus = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/calls/phone_status/${options.opponentId}`,
                requireAuth: false,
            });
        };
        this.getGames = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/games/apps`,
                requireAuth: false,
                params: { number: options.number, 'ids[]': options.gameIds, from_id: options.fromId },
            });
        };
        this.getGenres = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/genres`,
                requireAuth: false,
                params: { number: options.number, from: options.from },
            });
        };
        this.getGroupCalls = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/posts/group_calls`,
                requireAuth: false,
                params: {
                    from_timestamp: options.fromTimestamp,
                    group_category_id: options.groupCategoryId,
                    number: options.number,
                    scope: options.scope,
                },
            });
        };
        this.inviteToCallBulk = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/${options.callId}/bulk_invite`,
                requireAuth: true,
                params: { group_id: options.groupId },
            });
        };
        this.inviteUsersToCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/conference_calls/${options.callId}/invite`,
                requireAuth: true,
                json: { user_ids: options.userIds },
            });
        };
        this.inviteUsersToChatCall = async (options = {}) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/calls/invite`,
                requireAuth: true,
                json: { chat_room_id: options.chatRoomId, room_id: options.roomId, room_url: options.roomUrl },
            });
        };
        this.kickAndBanFromCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/conference_calls/${options.callId}/kick`,
                requireAuth: true,
                json: { call_id: options.callId, user_id: options.userId },
            });
        };
        this.notifyAnonymousUserLeaveAgoraChannel = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/anonymous_calls/leave_agora_channel`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, agora_uid: options.agoraUid },
            });
        };
        this.notifyUserLeaveAgoraChannel = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/leave_agora_channel`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, user_id: options.userId },
            });
        };
        this.sendCallScreenshot = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/calls/screenshot`,
                requireAuth: false,
                json: { screenshot_filename: options.screenshotFilename, conference_id: options.conferenceId },
            });
        };
        this.setCall = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/calls/${options.callId}`,
                requireAuth: true,
                json: { joinable_by: options.joinableBy, game_title: options.gameTitle, category_id: options.categoryId },
            });
        };
        this.setUserRole = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/calls/${options.callId}/users/${options.userId}`,
                requireAuth: true,
                json: { role: options.role },
            });
        };
        this.startCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/calls/start_conference_call`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, call_sid: options.callSid },
            });
        };
        this.stopCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/calls/leave_conference_call`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, call_sid: options.callSid },
            });
        };
        this.startAnonymousCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/anonymous_calls/start_conference_call`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, agora_uid: options.AgoraUid },
            });
        };
        this.stopAnonymousCall = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/anonymous_calls/leave_conference_call`,
                requireAuth: false,
                json: { conference_id: options.conferenceId, agora_uid: options.AgoraUid },
            });
        };
    }
}
exports.CallAPI = CallAPI;
