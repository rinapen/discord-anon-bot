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
exports.PostAPI = void 0;
const util = __importStar(require("../util/Utils"));
const Constants_1 = require("../util/Constants");
/**
 * **投稿API**
 *
 * @remarks
 * 投稿APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class PostAPI {
    constructor(base) {
        this.base = base;
        this.addBookmark = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/users/${options.userId}/bookmarks/${options.postId}`,
                requireAuth: true,
            });
        };
        this.addGroupHighlightPost = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/groups/${options.groupId}/highlights/${options.postId}`,
                requireAuth: false,
            });
        };
        this.createGroupCallPost = async (options = {}) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/posts/new_conference_call`,
                requireAuth: false,
                json: {
                    text: options.text,
                    font_size: options.fontSize,
                    color: options.color,
                    group_id: options.groupId,
                    call_type: options.callType,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                    category_id: options.categoryId,
                    game_title: options.gameTitle,
                    joinable_by: options.joinableBy,
                    message_tags: options.messageTags,
                    attachment_filename: options.attachmentFilename,
                    attachment_2_filename: options.attachment2Filename,
                    attachment_3_filename: options.attachment3Filename,
                    attachment_4_filename: options.attachment4Filename,
                    attachment_5_filename: options.attachment5Filename,
                    attachment_6_filename: options.attachment6Filename,
                    attachment_7_filename: options.attachment7Filename,
                    attachment_8_filename: options.attachment8Filename,
                    attachment_9_filename: options.attachment9Filename,
                },
            });
        };
        this.createGroupPinPost = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v2/posts/group_pinned_post`,
                requireAuth: false,
                json: { post_id: options.postId, group_id: options.groupId },
            });
        };
        this.createPost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/posts/new`,
                requireAuth: true,
                json: {
                    text: options.text,
                    font_size: options.fontSize,
                    color: options.color,
                    in_reply_to: options.inReplyTo,
                    group_id: options.groupId,
                    post_type: options.postType,
                    mention_ids: options.mentionIds,
                    choices: options.choices,
                    shared_url: options.sharedUrl,
                    message_tags: options.messageTags,
                    attachment_filename: options.attachmentFilename,
                    attachment_2_filename: options.attachment2Filename,
                    attachment_3_filename: options.attachment3Filename,
                    attachment_4_filename: options.attachment4Filename,
                    attachment_5_filename: options.attachment5Filename,
                    attachment_6_filename: options.attachment6Filename,
                    attachment_7_filename: options.attachment7Filename,
                    attachment_8_filename: options.attachment8Filename,
                    attachment_9_filename: options.attachment9Filename,
                    video_file_name: options.videoFileName,
                },
                headers: { 'X-Jwt': options.jwt },
            });
        };
        this.createRepost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/posts/repost`,
                requireAuth: true,
                json: {
                    text: options.text,
                    font_size: options.fontSize,
                    color: options.color,
                    in_reply_to: options.inReplyTo,
                    group_id: options.groupId,
                    post_type: options.postType,
                    mention_ids: options.mentionIds,
                    choices: options.choices,
                    shared_url: options.sharedUrl,
                    message_tags: options.messageTags,
                    attachment_filename: options.attachmentFilename,
                    attachment_2_filename: options.attachment2Filename,
                    attachment_3_filename: options.attachment3Filename,
                    attachment_4_filename: options.attachment4Filename,
                    attachment_5_filename: options.attachment5Filename,
                    attachment_6_filename: options.attachment6Filename,
                    attachment_7_filename: options.attachment7Filename,
                    attachment_8_filename: options.attachment8Filename,
                    attachment_9_filename: options.attachment9Filename,
                    video_file_name: options.videoFileName,
                },
                headers: { 'X-Jwt': options.jwt },
            });
        };
        this.createSharePost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/posts/new_share_post`,
                requireAuth: true,
                json: {
                    shareable_type: options.shareableType,
                    shareable_id: options.shareableId,
                    text: options.text,
                    font_size: options.fontSize,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                    color: options.color,
                    group_id: options.groupId,
                },
            });
        };
        this.createThreadPost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/threads/${options.threadId}/posts`,
                requireAuth: true,
                json: {
                    text: options.text,
                    font_size: options.fontSize,
                    color: options.color,
                    in_reply_to: options.inReplyTo,
                    group_id: options.groupId,
                    post_type: options.postType,
                    mention_ids: options.mentionIds,
                    choices: options.choices,
                    shared_url: options.sharedUrl,
                    message_tags: options.messageTags,
                    attachment_filename: options.attachmentFilename,
                    attachment_2_filename: options.attachment2Filename,
                    attachment_3_filename: options.attachment3Filename,
                    attachment_4_filename: options.attachment4Filename,
                    attachment_5_filename: options.attachment5Filename,
                    attachment_6_filename: options.attachment6Filename,
                    attachment_7_filename: options.attachment7Filename,
                    attachment_8_filename: options.attachment8Filename,
                    attachment_9_filename: options.attachment9Filename,
                    video_file_name: options.videoFileName,
                },
                headers: { 'X-Jwt': options.jwt },
            });
        };
        this.deleteAllPost = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v1/posts/delete_all_post`,
                requireAuth: false,
            });
        };
        this.deleteGroupPinPost = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v2/posts/group_pinned_post`,
                params: { group_id: options.groupId },
                requireAuth: false,
            });
        };
        this.deletePinPost = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/pinned/posts/${options.postId}`,
                requireAuth: false,
            });
        };
        this.getBookmark = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/${options.userId}/bookmarks`,
                params: { from: options.from },
                requireAuth: false,
            });
        };
        this.getCallTimeline = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/call_timeline`,
                params: {
                    group_id: options.groupId,
                    from_timestamp: options.fromTimestamp,
                    number: options.number,
                    category_id: options.categoryId,
                    call_type: options.callType,
                    include_circle_call: options.includeCircleCall,
                    cross_generation: options.crossGeneration,
                    exclude_recent_gomimushi: options.excludeRecentGomimushi,
                    shared_interest_categories: options.sharedInterestCategories,
                },
                requireAuth: false,
            });
        };
        this.getConversation = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/conversations/${options.conversationId}`,
                params: {
                    group_id: options.groupId,
                    thread_id: options.threadId,
                    from_post_id: options.fromPostId,
                    reverse: options.reverse,
                },
                requireAuth: false,
            });
        };
        this.getConversationRootPosts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/conversations/root_posts`,
                params: { 'ids[]': options.postIds },
                requireAuth: false,
            });
        };
        this.getFollowingCallTimeline = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/call_followers_timeline`,
                params: {
                    from_timestamp: options.fromTimestamp,
                    number: options.number,
                    category_id: options.categoryId,
                    call_type: options.callType,
                    include_circle_call: options.includeCircleCall,
                    exclude_recent_gomimushi: options.excludeRecentGomimushi,
                },
                requireAuth: false,
            });
        };
        this.getFollowingTimeline = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/following_timeline`,
                params: {
                    from: options.from,
                    from_post_id: options.fromPostId,
                    only_root: options.onlyRoot,
                    order_by: options.orderBy,
                    number: options.number,
                    mxn: options.mxn,
                    reduce_selfie: options.reduceSelfie,
                    custom_generation_range: options.customGenerationRange,
                },
                requireAuth: false,
            });
        };
        this.getGroupHighlightPosts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/groups/${options.groupId}/highlights`,
                params: { from: options.from, number: options.number },
                requireAuth: false,
            });
        };
        this.getGroupSearchPosts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/groups/${options.groupId}/posts/search`,
                params: {
                    keyword: options.keyword,
                    from_post_id: options.fromPostId,
                    number: options.number,
                    only_thread_posts: options.onlyThreadPosts,
                },
                requireAuth: false,
            });
        };
        this.getGroupTimeline = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/group_timeline`,
                params: {
                    group_id: options.groupId,
                    from_post_id: options.fromPostId,
                    reverse: options.reverse,
                    post_type: options.postType,
                    number: options.number,
                    only_root: options.onlyRoot,
                },
                requireAuth: false,
            });
        };
        this.getHashtagTimeline = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/tags/${options.tag}`,
                params: { from_post_id: options.fromPostId, number: options.number },
                requireAuth: false,
            });
        };
        this.getMyPosts = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/mine`,
                params: {
                    from_post_id: options.fromPostId,
                    number: options.number,
                    include_group_post: options.includeGroupPost,
                },
                requireAuth: false,
            });
        };
        this.getPost = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/${options.postId}`,
                requireAuth: false,
            });
        };
        this.getPostLikers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/posts/${options.postId}/likers`,
                params: { from_id: options.fromId },
                requireAuth: false,
            });
        };
        this.getPostReposts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/${options.postId}/reposts`,
                params: { from_post_id: options.fromPostId },
                requireAuth: false,
            });
        };
        this.getPosts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/multiple`,
                params: { 'post_ids[]': options.postIds },
                requireAuth: false,
            });
        };
        this.getRecentEngagementsPosts = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/recent_engagement`,
                params: { number: options.number },
                requireAuth: false,
            });
        };
        this.getRecommendedPostTags = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/posts/recommended_tag`,
                params: { tag: options.tag, save_recent_search: options.saveRecentSearch },
                requireAuth: false,
            });
        };
        this.getRecommendedPosts = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/recommended_timeline`,
                params: {
                    experiment_num: options.experimentNum,
                    variant_num: options.variantNum,
                    number: options.saveRecentSearch,
                    shared_interest_categories: options.saveRecentSearch,
                },
                requireAuth: false,
            });
        };
        this.getSearchPosts = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/search`,
                params: {
                    keyword: options.keyword,
                    post_owner_scope: options.postOwnerScope,
                    only_media: options.onlyMedia,
                    from_post_id: options.fromPostId,
                    number: options.number,
                },
                requireAuth: false,
            });
        };
        this.getTimeline = async (options) => {
            let noreplyMode = '';
            if (options.noreplyMode) {
                noreplyMode = 'noreply_';
            }
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/${noreplyMode}timeline`,
                params: {
                    order_by: options.orderBy,
                    experiment_older_age_rules: options.experimentOlderAgeRules,
                    shared_interest_categories: options.sharedInterestCategories,
                    from: options.from,
                    from_post_id: options.fromPostId,
                    number: options.number,
                    mxn: options.mxn,
                    en: options.en,
                    vn: options.vn,
                    reduce_selfie: options.reduceSelfie,
                    custom_generation_range: options.customGenerationRange,
                },
                requireAuth: false,
            });
        };
        this.getUrlMetadata = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/url_metadata`,
                requireAuth: false,
                params: { url: options.url },
            });
        };
        this.getUserTimeline = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/posts/user_timeline`,
                requireAuth: false,
                params: {
                    user_id: options.userId,
                    from_post_id: options.fromPostId,
                    post_type: options.postType,
                    number: options.number,
                },
            });
        };
        this.likePosts = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/posts/like`,
                requireAuth: false,
                params: { post_ids: options.postIds },
            });
        };
        this.removeBookmark = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/users/${options.userId}/bookmarks/${options.postId}`,
                requireAuth: false,
            });
        };
        this.removeGroupHighlightPost = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/groups/${options.groupId}/highlights/${options.postId}`,
                requireAuth: false,
            });
        };
        this.removePosts = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/posts/mass_destroy`,
                json: { posts_ids: options.postIds },
                requireAuth: false,
            });
        };
        this.reportPost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/posts/${options.postId}/report`,
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
        this.unlikePost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/posts/${options.postId}/unlike`,
                requireAuth: false,
            });
        };
        this.updatePost = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v3/posts/${options.postId}`,
                requireAuth: true,
                json: {
                    text: options.text,
                    font_size: options.fontSize,
                    color: options.color,
                    message_tags: options.messageTags,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
            });
        };
        this.updateRecommendationFeedback = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/posts/${options.postId}/recommendation_feedback`,
                requireAuth: true,
                json: {
                    experiment_num: options.experimentNum,
                    variant_num: options.variantNum,
                    feedback_result: options.feedbackResult,
                },
            });
        };
        this.validatePost = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/posts/validate`,
                requireAuth: false,
                json: {
                    text: options.text,
                    group_id: options.groupId,
                    thread_id: options.threadId,
                },
            });
        };
        this.viewVideo = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/posts/videos/${options.videoId}/view`,
                requireAuth: false,
            });
        };
        this.voteSurvey = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/surveys/${options.surveyId}/vote`,
                json: { choice_id: options.choiceId },
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
        return util.md5(this.deviceUuid, Math.floor(Date.now() / 1000), false);
    }
    /** @ignore */
    get signedVersion() {
        return util.sha256();
    }
}
exports.PostAPI = PostAPI;
