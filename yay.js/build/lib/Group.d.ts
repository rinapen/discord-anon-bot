import { BaseClient } from '../client/BaseClient';
import { AdditionalSettingsResponse, CreateGroupResponse, CreateQuotaResponse, GroupCategoriesResponse, GroupNotificationSettingsResponse, GroupResponse, GroupUserResponse, GroupUsersResponse, GroupsRelatedResponse, GroupsResponse, UnreadStatusResponse, UsersByTimestampResponse, UsersResponse } from '../util/Responses';
/**
 * **サークルAPI**
 *
 * @remarks
 * サークルAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class GroupAPI {
    private readonly base;
    constructor(base: BaseClient);
    acceptModeratorOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    acceptOwnershipOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    acceptUserRequest: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    addRelatedGroups: (options: {
        groupId: number;
        relatedGroupId: number;
    }) => Promise<any>;
    banUser: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    checkUnreadStatus: (options: {
        fromTime: number;
    }) => Promise<UnreadStatusResponse>;
    create: (options: {
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
    createPinGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    declineModeratorOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    declineOwnershipOffer: (options: {
        groupId: number;
    }) => Promise<any>;
    declineUserRequest: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    deleteCover: (options: {
        groupId: number;
    }) => Promise<any>;
    deleteIcon: (options: {
        groupId: number;
    }) => Promise<any>;
    deletePinGroup: (options: {
        groupId: number;
    }) => Promise<any>;
    getBannedMembers: (options: {
        groupId: number;
        page?: number;
    }) => Promise<UsersResponse>;
    getCategories: (options: {
        page?: number;
        number?: number;
    }) => Promise<GroupCategoriesResponse>;
    getCreateQuota: () => Promise<CreateQuotaResponse>;
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
    getInvitableUsers: (options: {
        groupId: number;
        fromTimestamp?: number;
        nickname?: string;
    }) => Promise<UsersByTimestampResponse>;
    getJoinedStatuses: (options: {
        groupIds: number[];
    }) => Promise<Record<string, string>>;
    getMember: (options: {
        groupId: number;
        userId: number;
    }) => Promise<GroupUserResponse>;
    getMembers: (options: {
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
    getUserGroups: (options: {
        userId: number;
        page?: number;
    }) => Promise<GroupsResponse>;
    inviteUsers: (options: {
        groupId: number;
        userIds: number[];
    }) => Promise<any>;
    join: (options: {
        groupId: number;
    }) => Promise<any>;
    leave: (options: {
        groupId: number;
    }) => Promise<any>;
    removeModerator: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
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
    removeRelatedGroups: (options: {
        groupId: number;
        relatedGroupIds: number[];
    }) => Promise<any>;
    report: (options: {
        groupId: number;
        categoryId: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    sendModeratorOffers: (options: {
        groupId: number;
        userIds: number[];
    }) => Promise<any>;
    sendOwnershipOffer: (options: {
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
    setTitle: (options: {
        groupId: number;
        title: string;
    }) => Promise<any>;
    takeoverOwnership: (options: {
        groupId: number;
    }) => Promise<any>;
    unbanUser: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    update: (options: {
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
    visit: (options: {
        groupId: number;
    }) => Promise<any>;
    withdrawModeratorOffer: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    withdrawOwnershipOffer: (options: {
        groupId: number;
        userId: number;
    }) => Promise<any>;
    /** @ignore */
    private get uuid();
    /** @ignore */
    private get deviceUuid();
    /** @ignore */
    private get signedInfo();
}
