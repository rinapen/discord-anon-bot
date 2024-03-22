import { BaseClient } from '../client/BaseClient';
import { ActiveFollowingsResponse, AdditionalSettingsResponse, CreateUserResponse, FollowRecommendationsResponse, FollowRequestCountResponse, FollowUsersResponse, FootprintsResponse, HimaUsersResponse, RefreshCounterRequestsResponse, UserCustomDefinitionsResponse, UserEmailResponse, UserResponse, UserTimestampResponse, UsersByTimestampResponse, UsersResponse } from '../util/Responses';
/**
 * **ユーザーAPI**
 *
 * @remarks
 * ユーザーAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class UserAPI {
    private readonly base;
    constructor(base: BaseClient);
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
    getFollowRequest: (options?: {
        fromTimestamp?: number;
    }) => Promise<UsersByTimestampResponse>;
    getFollowRequestCount: () => Promise<FollowRequestCountResponse>;
    getFollowingUsersBorn: (options?: {
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
    getRecommendedUsersToFollowForProfile: (options: {
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
        jwt: string;
        userIds: number[];
    }) => Promise<UsersResponse>;
    getUsersFromUuid: (options: {
        uuid: string;
    }) => Promise<UsersResponse>;
    reduceKentaPenalty: () => Promise<void>;
    refreshCounter: (options: {
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
    setAdditionalSettingEnabled: (options: {
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
    updateUser: (options: {
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
    /** @ignore */
    private get uuid();
    /** @ignore */
    private get deviceUuid();
    /** @ignore */
    private get signedInfo();
    /** @ignore */
    private get signedVersion();
}
