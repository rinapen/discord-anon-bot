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
exports.UserAPI = void 0;
const Constants_1 = require("../util/Constants");
const util = __importStar(require("../util/Utils"));
/**
 * **ユーザーAPI**
 *
 * @remarks
 * ユーザーAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class UserAPI {
    constructor(base) {
        this.base = base;
        this.deleteContactFriends = async () => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/users/contact_friends`,
                requireAuth: false,
            });
        };
        this.deleteFootprint = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v2/users/${options.userId}/footprints/${options.footprintId}`,
                requireAuth: false,
            });
        };
        this.destroyUser = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/destroy`,
                json: {
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Date.now(),
                    signed_info: this.signedInfo,
                },
                requireAuth: false,
            });
        };
        this.followUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/${options.userId}/follow`,
                requireAuth: false,
            });
        };
        this.followUsers = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/follow`,
                params: { 'user_ids[]': options.userIds },
                requireAuth: false,
            });
        };
        this.getActiveFollowings = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/active_followings`,
                params: { only_online: options.onlyOnline, from_loggedin_at: options.fromLoggedinAt },
                requireAuth: false,
            });
        };
        this.getAdditionalSettings = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/additonal_notification_setting`,
                requireAuth: false,
            });
        };
        this.getFollowRecommendations = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/friends`,
                params: {
                    from_timestamp: options.fromTimestamp,
                    number: options.number,
                    sources: options.sources,
                },
                requireAuth: false,
            });
        };
        this.getFollowRequest = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/follow_requests`,
                params: { from_timestamp: options.fromTimestamp },
                requireAuth: false,
            });
        };
        this.getFollowRequestCount = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/follow_requests_count`,
                requireAuth: false,
            });
        };
        this.getFollowingUsersBorn = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/following_born_today`,
                params: { birthdate: options.birthdate },
                requireAuth: false,
            });
        };
        this.getFootprints = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/footprints`,
                params: { from_id: options.fromId, number: options.number, mode: options.mode },
                requireAuth: false,
            });
        };
        this.getFreshUser = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/fresh/${options.userId}`,
                requireAuth: false,
            });
        };
        this.getHimaUsers = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/hima_users`,
                params: { from_hima_id: options.fromHimaId, number: options.number },
                requireAuth: false,
            });
        };
        this.getRecommendedUsersToFollowForProfile = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/${options.userId}/follow_recommended`,
                params: { page: options.page, number: options.number },
                requireAuth: false,
            });
        };
        this.getRefreshCounterRequests = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/reset_counters`,
                requireAuth: false,
            });
        };
        this.getTimestamp = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/timestamp`,
                requireAuth: false,
            });
        };
        this.getUser = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/${options.userId}`,
                requireAuth: false,
            });
        };
        this.getUserCustomDefinitions = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/custom_definitions`,
                requireAuth: false,
            });
        };
        this.getUserEmail = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/fresh/${options.userId}`,
                requireAuth: false,
            });
        };
        this.getUserFollowers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/${options.userId}/followers`,
                params: {
                    from_follow_id: options.fromFollowId,
                    followed_by_me: options.followedByMe,
                    'user[nickname]': options.nickname,
                },
                requireAuth: false,
            });
        };
        this.getUserFollowings = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/${options.userId}/list_followings`,
                params: {
                    from_follow_id: options.fromFollowId,
                    from_timestamp: options.fromTimestamp,
                    order_by: options.orderBy,
                },
                requireAuth: false,
            });
        };
        this.getUserFromQr = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/qr_codes/${options.qr}`,
                requireAuth: false,
            });
        };
        this.getUserWithCallUserId = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/calls/${options.callId}/participants/${options.callUserId}`,
                requireAuth: false,
            });
        };
        this.getUserWithoutLeavingFootprint = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/info/${options.userId}`,
                requireAuth: false,
            });
        };
        this.getUsers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/list_id`,
                params: { 'user_ids[]': options.userIds },
                headers: { 'X-Jwt': options.jwt },
                requireAuth: false,
            });
        };
        this.getUsersFromUuid = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/list_uuid`,
                params: { uuid: options.uuid },
                requireAuth: false,
            });
        };
        this.reduceKentaPenalty = async () => { };
        this.refreshCounter = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/reset_counters`,
                json: { counter: options.counter },
                requireAuth: false,
            });
        };
        this.reg = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/users/register`,
                json: {
                    app_version: Constants_1.API_VERSION_NAME,
                    timestamp: Math.floor(Date.now() / 1000),
                    api_key: Constants_1.API_KEY,
                    signed_version: this.signedVersion,
                    signed_info: this.signedInfo,
                    uuid: this.uuid,
                    nickname: options.nickname,
                    birth_date: options.birthDate,
                    gender: options.gender,
                    country_code: options.countryCode,
                    biography: options.biography,
                    prefecture: options.prefecture,
                    profile_icon_filename: options.profileIconFilename,
                    cover_image_filename: options.coverImageFilename,
                    email: options.email,
                    password: options.password,
                    email_grant_token: options.emailGrantToken,
                    en: options.en,
                    vn: options.vn,
                },
                requireAuth: false,
            });
        };
        this.removeUserAvatar = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/remove_profile_photo`,
                requireAuth: false,
            });
        };
        this.removeUserCover = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/remove_cover_image`,
                requireAuth: false,
            });
        };
        this.reportUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/users/${options.userId}/report`,
                json: {
                    category_id: options.categoryId,
                    reason: options.reason,
                    screenshot_filename: options.screenshotFilename,
                    screenshot_2_filename: options.screenshot2Filename,
                    screenshot_3_filename: options.screenshot3Filename,
                    screenshot_4_filename: options.screenshot4Filename,
                },
                requireAuth: false,
            });
        };
        this.resetPassword = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/users/reset_password`,
                json: {
                    email: options.email,
                    email_grant_token: options.emailGrantToken,
                    password: options.password,
                },
                requireAuth: false,
            });
        };
        this.searchLobiUsers = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/lobi_friends`,
                params: {
                    nickname: options.nickname,
                    number: options.number,
                    from: options.from,
                },
                requireAuth: false,
            });
        };
        this.searchUsers = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/search`,
                params: {
                    gender: options.gender,
                    nickname: options.nickname,
                    title: options.title,
                    biography: options.biography,
                    from_timestamp: options.fromTimestamp,
                    similar_age: options.similarAge,
                    not_recent_gomimushi: options.notRecentGomimushi,
                    recently_created: options.recentlyCreated,
                    same_prefecture: options.samePrefecture,
                    prefecture: options.prefecture,
                    save_recent_search: options.saveRecentSearch,
                    number: options.number,
                    page: options.page,
                },
                requireAuth: false,
            });
        };
        this.setAdditionalSettingEnabled = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/additonal_notification_setting`,
                json: { mode: options.mode, on: options.on },
                requireAuth: false,
            });
        };
        this.setFollowPermissionEnabled = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/edit`,
                json: {
                    nickname: options.nickname,
                    is_private: options,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
                requireAuth: false,
            });
        };
        this.setSettingFollowRecommendationEnabled = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/visible_on_sns_friend_recommendation_setting`,
                params: { on: options.on },
                requireAuth: false,
            });
        };
        this.takeActionFollowRequest = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/${options.userId}/follow_request`,
                json: { action: options.action },
                requireAuth: false,
            });
        };
        this.turnOnHima = async () => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/hima`,
                requireAuth: false,
            });
        };
        this.unfollowUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/${options.userId}/unfollow`,
                requireAuth: false,
            });
        };
        this.updateLanguage = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/users/language`,
                json: {
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                    language: options.language,
                },
                requireAuth: false,
            });
        };
        this.updateUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v3/users/edit`,
                json: {
                    nickname: options.nickname,
                    username: options.username,
                    biography: options.biography,
                    prefecture: options.prefecture,
                    gender: options.gender,
                    country_code: options.countryCode,
                    profile_icon_filename: options.profileIconFilename,
                    cover_image_filename: options.coverImageFilename,
                    uuid: this.uuid,
                    api_key: Constants_1.API_KEY,
                    timestamp: Math.floor(Date.now() / 1000),
                    signed_info: this.signedInfo,
                },
                requireAuth: false,
            });
        };
        this.uploadTwitterFriendIds = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/twitter_friends`,
                json: { twitter_friend_ids: options.twitterFriendIds },
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
    /** @ignore */
    get signedVersion() {
        return util.sha256();
    }
}
exports.UserAPI = UserAPI;
