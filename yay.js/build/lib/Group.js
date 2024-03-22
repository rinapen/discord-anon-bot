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
exports.GroupAPI = void 0;
const util = __importStar(require("../util/Utils"));
const Constants_1 = require("../util/Constants");
/**
 * **サークルAPI**
 *
 * @remarks
 * サークルAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class GroupAPI {
    constructor(base) {
        this.base = base;
        this.acceptModeratorOffer = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/${options.groupId}/deputize`,
                requireAuth: false,
            });
        };
        this.acceptOwnershipOffer = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/${options.groupId}/transfer`,
                requireAuth: false,
            });
        };
        this.acceptUserRequest = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/accept/${options.userId}`,
                requireAuth: false,
            });
        };
        this.addRelatedGroups = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/v${options.groupId}/related`,
                params: { related_group_id: options.relatedGroupId },
                requireAuth: false,
            });
        };
        this.banUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/ban/${options.userId}`,
                requireAuth: false,
            });
        };
        this.checkUnreadStatus = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/unread_status`,
                params: { from_time: options.fromTime },
                requireAuth: false,
            });
        };
        this.create = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/groups/new`,
                json: {
                    topic: options.topic,
                    description: options.description,
                    secret: options.secret,
                    hide_reported_posts: options.hideReportedPosts,
                    hide_conference_call: options.hideConferenceCall,
                    is_private: options.isPrivate,
                    only_verified_age: options.onlyVerifiedAge,
                    only_mobile_verified: options.onlyMobileVerified,
                    call_timeline_display: options.callTimelineDisplay,
                    allow_ownership_transfer: options.allowOwnershipTransfer,
                    allow_thread_creation_by: options.allowThreadCreationBy,
                    gender: options.gender,
                    generation_groups_limit: options.generationGroupsLimit,
                    group_category_id: options.groupCategoryId,
                    cover_image_filename: options.coverImageFilename,
                    group_icon_filename: options.groupIconFilename,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                    sub_category_id: options.subCategoryId,
                    hide_from_game_eight: options.hideFromGameEight,
                    allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
                    allow_members_to_post_url: options.allowMembersToPostUrl,
                    guidelines: options.guidelines,
                },
                requireAuth: false,
            });
        };
        this.createPinGroup = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/pinned/groups`,
                json: { id: options.groupId },
                requireAuth: false,
            });
        };
        this.declineModeratorOffer = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/groups/${options.groupId}/deputize`,
                requireAuth: false,
            });
        };
        this.declineOwnershipOffer = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/groups/${options.groupId}/transfer`,
                requireAuth: false,
            });
        };
        this.declineUserRequest = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/decline/${options.userId}`,
                requireAuth: false,
            });
        };
        this.deleteCover = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v3/groups/${options.groupId}/cover`,
                requireAuth: false,
            });
        };
        this.deleteIcon = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v3/groups/${options.groupId}/icon`,
                requireAuth: false,
            });
        };
        this.deletePinGroup = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `/v1/pinned/groups/${options.groupId}`,
                requireAuth: false,
            });
        };
        this.getBannedMembers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}/ban_list`,
                params: { page: options.page },
                requireAuth: false,
            });
        };
        this.getCategories = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/categories`,
                params: { page: options.page, number: options.number },
                requireAuth: false,
            });
        };
        this.getCreateQuota = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/created_quota`,
                requireAuth: false,
            });
        };
        this.getGroup = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}`,
                requireAuth: false,
            });
        };
        this.getGroupNotificationSettings = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/notification_settings/groups/${options.groupId}`,
                requireAuth: false,
            });
        };
        this.getGroups = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/groups`,
                params: {
                    group_category_id: options.groupCategoryId,
                    keyword: options.keyword,
                    from_timestamp: options.fromTimestamp,
                    sub_category_id: options.subCategoryId,
                },
                requireAuth: false,
            });
        };
        this.getInvitableUsers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}/users/invitable`,
                params: {
                    from_timestamp: options.fromTimestamp,
                    nickname: options.nickname,
                },
                requireAuth: false,
            });
        };
        this.getJoinedStatuses = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/joined_statuses`,
                params: { ids: options.groupIds },
                requireAuth: false,
            });
        };
        this.getMember = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}/members/${options.userId}`,
                requireAuth: false,
            });
        };
        this.getMembers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/groups/${options.groupId}/members`,
                params: {
                    mode: options.mode,
                    keyword: options.keyword,
                    from_id: options.fromId,
                    from_timestamp: options.fromTimestamp,
                    order_by: options.orderBy,
                    followed_by_me: options.followedByMe,
                },
                requireAuth: false,
            });
        };
        this.getMyGroups = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/groups/mine`,
                params: { from_timestamp: options.fromTimestamp },
                requireAuth: false,
            });
        };
        this.getRelatableGroups = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}/related`,
                params: { keyword: options.keyword, from: options.from },
                requireAuth: false,
            });
        };
        this.getUserGroups = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/user_group_list`,
                params: { user_id: options.userId, page: options.page },
                requireAuth: false,
            });
        };
        this.inviteUsers = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/invite`,
                json: { user_ids: options.userIds },
                requireAuth: false,
            });
        };
        this.join = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/join`,
                requireAuth: false,
            });
        };
        this.leave = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/groups/${options.groupId}/leave`,
                requireAuth: false,
            });
        };
        this.removeModerator = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/fire/${options.userId}`,
                requireAuth: false,
            });
        };
        /**
         *
         * 関連するサークルを削除します
         *
         * @remarks
         * `DELETE`: https://api.yay.space/v1/groups/:groupId/related
         *
         * @param options - 引数のオプション
         * @param options.groupId - サークルのID
         * @param options.relatedGroupIds - 関連するサークルのID
         *
         * @see https://github.com/qvco/yay.js
         *
         */
        this.removeRelatedGroups = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/groups/${options.groupId}/related`,
                params: { 'related_group_id[]': options.relatedGroupIds },
                requireAuth: false,
            });
        };
        this.report = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/groups/${options.groupId}/report`,
                json: {
                    category_id: options.categoryId,
                    reason: options.reason,
                    opponent_id: options.opponentId,
                    screenshot_filename: options.screenshotFilename,
                    screenshot_2_filename: options.screenshot2Filename,
                    screenshot_3_filename: options.screenshot3Filename,
                    screenshot_4_filename: options.screenshot4Filename,
                },
                requireAuth: false,
            });
        };
        this.sendModeratorOffers = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/groups/${options.groupId}/deputize/mass`,
                json: {
                    user_ids: options.userIds,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
                requireAuth: false,
            });
        };
        this.sendOwnershipOffer = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/groups/${options.groupId}/transfer`,
                json: {
                    user_id: options.userId,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
                requireAuth: false,
            });
        };
        this.setGroupNotificationSettings = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/notification_settings/groups/${options.groupId}`,
                json: {
                    notification_group_post: options.notificationGroupPost,
                    notification_group_join: options.notificationGroupJoin,
                    notification_group_request: options.notificationGroupRequest,
                    notification_group_message_tag_all: options.notificationGroupMessageTagAll,
                },
                requireAuth: false,
            });
        };
        this.setTitle = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/set_title`,
                json: { title: options.title },
                requireAuth: false,
            });
        };
        this.takeoverOwnership = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/take_over`,
                requireAuth: false,
            });
        };
        this.unbanUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/unban/${options.userId}`,
                requireAuth: false,
            });
        };
        this.update = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/groups/${options.groupId}/update`,
                json: {
                    topic: options.topic,
                    description: options.description,
                    secret: options.secret,
                    hide_reported_posts: options.hideReportedPosts,
                    hide_conference_call: options.hideConferenceCall,
                    is_private: options.isPrivate,
                    only_verified_age: options.onlyVerifiedAge,
                    only_mobile_verified: options.onlyMobileVerified,
                    call_timeline_display: options.callTimelineDisplay,
                    allow_ownership_transfer: options.allowOwnershipTransfer,
                    allow_thread_creation_by: options.allowThreadCreationBy,
                    gender: options.gender,
                    generation_groups_limit: options.generationGroupsLimit,
                    group_category_id: options.groupCategoryId,
                    cover_image_filename: options.coverImageFilename,
                    group_icon_filename: options.groupIconFilename,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                    sub_category_id: options.subCategoryId,
                    hide_from_game_eight: options.hideFromGameEight,
                    allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
                    allow_members_to_post_url: options.allowMembersToPostUrl,
                    guidelines: options.guidelines,
                },
                requireAuth: false,
            });
        };
        this.visit = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/visit`,
                requireAuth: false,
            });
        };
        this.withdrawModeratorOffer = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/${options.groupId}/deputize/${options.userId}/withdraw`,
                requireAuth: false,
            });
        };
        this.withdrawOwnershipOffer = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/${options.groupId}/transfer/withdraw`,
                json: { user_id: options.userId },
                requireAuth: false,
            });
        };
    }
    /** @ignore */
    get uuid() {
        return this.base.uuid;
    }
    /** @ignore */
    get deviceUuid() {
        return this.base.deviceUuid;
    }
    /** @ignore */
    get signedInfo() {
        return util.md5(this.uuid, Math.floor(Date.now() / 1000), true);
    }
}
exports.GroupAPI = GroupAPI;
