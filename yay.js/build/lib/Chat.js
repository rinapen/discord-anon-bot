"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAPI = void 0;
/**
 * **チャットAPI**
 *
 * @remarks
 * チャットルームAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class ChatAPI {
    constructor(base) {
        this.base = base;
        this.acceptRequest = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/accept_chat_request`,
                requireAuth: false,
                json: { chat_room_ids: options.roomIds },
            });
        };
        this.checkUnreadStatus = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/chat_rooms/unread_status`,
                requireAuth: false,
                params: { from_time: options.fromTime },
            });
        };
        this.createGroup = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/chat_rooms/new`,
                requireAuth: false,
                json: {
                    name: options.name,
                    with_user_ids: options.withUserIds,
                    icon_filename: options.iconFilename,
                    background_filename: options.backgroundFilename,
                },
            });
        };
        this.createPrivate = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/new`,
                requireAuth: false,
                json: { with_user_id: options.withUserId, matching_id: options.matchingId, hima_chat: options.himaChat },
            });
        };
        this.deleteBackground = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v2/chat_rooms/${options.roomId}/background`,
                requireAuth: false,
            });
        };
        this.deleteMessage = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/chat_rooms/${options.roomId}/messages/${options.messageId}/delete`,
                requireAuth: false,
            });
        };
        this.edit = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/chat_rooms/${options.roomId}/edit`,
                requireAuth: false,
                json: {
                    name: options.name,
                    icon_filename: options.iconFilename,
                    background_filename: options.backgroundFilename,
                },
            });
        };
        this.getChatableUsers = async (
        // options?: SearchCriteria,
        options = {}) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/followings/chatable`,
                requireAuth: false,
                params: {
                    from_follow_id: options.fromFollowId,
                    from_timestamp: options.fromTimestamp,
                    order_by: options.orderBy,
                },
            });
        };
        this.getGifsData = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/gif_data`,
                requireAuth: false,
            });
        };
        this.getHiddenChatRooms = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `/v1/hidden/chats`,
                requireAuth: false,
                params: { number: options.number, from_timestamp: options.fromTimestamp },
            });
        };
        this.getMainRooms = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/chat_rooms/main_list`,
                requireAuth: false,
                params: { from_timestamp: options.fromTimestamp },
            });
        };
        this.getMessages = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/chat_rooms/${options.roomId}/messages`,
                requireAuth: false,
                params: { number: options.number, from_message_id: options.fromMessageId, to_message_id: options.toMessageId },
            });
        };
        this.getNotificationSettings = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/notification_settings/chat_rooms/${options.roomId}`,
                requireAuth: false,
            });
        };
        this.getRequestRooms = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/chat_rooms/request_list`,
                requireAuth: false,
                params: { from_timestamp: options.fromTimestamp },
            });
        };
        this.getRoom = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/chat_rooms/${options.roomId}`,
                requireAuth: false,
            });
        };
        this.getStickerPacks = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v2/sticker_packs`,
                requireAuth: false,
            });
        };
        this.getTotalRequests = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/chat_rooms/total_chat_request`,
                requireAuth: true,
            });
        };
        this.hideChat = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/hidden/chats`,
                requireAuth: true,
                json: { chat_room_id: options.roomId },
            });
        };
        this.invite = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/chat_rooms/${options.roomId}/invite`,
                requireAuth: true,
                json: { with_user_ids: options.withUserIds },
            });
        };
        this.kickUsers = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/chat_rooms/${options.roomId}/kick`,
                requireAuth: true,
                json: { with_user_ids: options.withUserIds },
            });
        };
        this.pin = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/${options.roomId}/pinned`,
                requireAuth: true,
            });
        };
        this.readAttachment = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/${options.roomId}/attachments_read`,
                requireAuth: true,
                json: { attachment_msg_ids: options.attachmentMsgIds },
            });
        };
        this.readMessage = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/chat_rooms/${options.roomId}/messages/${options.messageId}/read`,
                requireAuth: true,
            });
        };
        this.readVideoMessage = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/${options.roomId}/videos_read`,
                requireAuth: true,
                json: { video_msg_ids: options.videoMsgIds },
            });
        };
        this.refreshRooms = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/chat_rooms/update`,
                requireAuth: true,
                params: { from_time: options.fromTime },
            });
        };
        this.remove = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/mass_destroy`,
                requireAuth: true,
                json: { chat_room_ids: options.roomIds },
            });
        };
        this.report = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/chat_rooms/${options.roomId}/report`,
                requireAuth: false,
                json: {
                    category_id: options.categoryId,
                    reason: options.reason,
                    opponent_id: options.opponentId,
                    screenshot_filename: options.screenshotFilename,
                    screenshot_2_filename: options.screenshot2Filename,
                    screenshot_3_filename: options.screenshot3Filename,
                    screenshot_4_filename: options.screenshot4Filename,
                },
            });
        };
        this.sendMediaScreenshotNotification = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/chat_rooms/${options.roomId}/screen_captured`,
                requireAuth: false,
            });
        };
        this.sendMessage = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/chat_rooms/${options.roomId}/messages/new`,
                requireAuth: false,
                json: {
                    message_type: options.messageType,
                    call_type: options.callType,
                    text: options.text,
                    font_size: options.fontSize,
                    gif_image_id: options.gifImageId,
                    attachment_file_name: options.attachmentFileName,
                    sticker_pack_id: options.stickerPackId,
                    sticker_id: options.stickerId,
                    video_file_name: options.videoFileName,
                    parent_id: options.parentId,
                },
            });
        };
        this.setNotificationSettings = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/notification_settings/chat_rooms/${options.roomId}`,
                requireAuth: false,
                json: { notification_chat: options.notificationChat },
            });
        };
        this.unHideChat = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/hidden/chats`,
                requireAuth: false,
                params: { chat_room_ids: options.roomIds },
            });
        };
        this.unpin = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/chat_rooms/${options.roomId}/pinned`,
                requireAuth: false,
            });
        };
    }
}
exports.ChatAPI = ChatAPI;
