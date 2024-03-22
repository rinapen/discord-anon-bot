"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareableType = exports.ImageType = exports.CallType = exports.PostType = exports.GatewayIntents = void 0;
exports.GatewayIntents = {
    ChatMessage: 'ChatRoomChannel',
    GroupUpdates: 'GroupUpdatesChannel',
};
/**
 * 投稿のタイプ
 */
exports.PostType = {
    text: 'text',
    media: 'media',
    image: 'image',
    video: 'video',
    survey: 'survey',
    call: 'call',
    shareableUrl: 'shareable_url',
};
/**
 * 通話のタイプ
 */
exports.CallType = {
    voice: 'voice',
    video: 'vdo',
};
/**
 * 画像のタイプ
 */
exports.ImageType = {
    post: 'post',
    chatMessage: 'chat_message',
    chatBackground: 'chat_background',
    report: 'report',
    userAvatar: 'user_avatar',
    userCover: 'user_cover',
    groupIcon: 'group_icon',
    groupCover: 'group_cover',
    groupThreadIcon: 'group_thread_icon',
};
/**
 * 共有のタイプ
 */
exports.ShareableType = {
    group: 'group',
    thread: 'thread',
};
