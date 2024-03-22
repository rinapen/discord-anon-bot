import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse, CreatePostResponse, LikePostsResponse, PostLikersResponse, PostResponse, PostTagsResponse, PostsResponse, ValidationPostResponse, VoteSurveyResponse } from '../util/Responses';
import { MessageTag, Post, SharedUrl } from '../util/Models';
/**
 * **投稿API**
 *
 * @remarks
 * 投稿APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class PostAPI {
    private readonly base;
    constructor(base: BaseClient);
    addBookmark: (options: {
        userId: number;
        postId: number;
    }) => Promise<BookmarkPostResponse>;
    addGroupHighlightPost: (options: {
        groupId: number;
        postId: number;
    }) => Promise<BookmarkPostResponse>;
    createGroupCallPost: (options?: {
        text?: string;
        fontSize?: number;
        color?: number;
        groupId?: number;
        callType?: string;
        categoryId?: number;
        gameTitle?: string;
        joinableBy?: string;
        messageTags?: MessageTag[];
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
    }) => Promise<CreatePostResponse>;
    createGroupPinPost: (options: {
        postId: number;
        groupId: number;
    }) => Promise<any>;
    createPost: (options: {
        jwt: string;
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        postType?: string;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: SharedUrl;
        messageTags?: MessageTag[];
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<Post>;
    createRepost: (options: {
        jwt: string;
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        postType?: string;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: SharedUrl;
        messageTags?: MessageTag[];
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<CreatePostResponse>;
    createSharePost: (options: {
        shareableType: string;
        shareableId: number;
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        groupId?: number;
    }) => Promise<Post>;
    createThreadPost: (options: {
        jwt: string;
        threadId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        inReplyTo?: number;
        groupId?: number;
        postType?: string;
        mentionIds?: number[];
        choices?: string[];
        sharedUrl?: SharedUrl;
        messageTags?: MessageTag[];
        attachmentFilename?: string;
        attachment2Filename?: string;
        attachment3Filename?: string;
        attachment4Filename?: string;
        attachment5Filename?: string;
        attachment6Filename?: string;
        attachment7Filename?: string;
        attachment8Filename?: string;
        attachment9Filename?: string;
        videoFileName?: string;
    }) => Promise<Post>;
    deleteAllPost: () => Promise<any>;
    deleteGroupPinPost: (options: {
        groupId: number;
    }) => Promise<any>;
    deletePinPost: (options: {
        postId: number;
    }) => Promise<any>;
    getBookmark: (options: {
        userId: number;
        from?: string;
    }) => Promise<PostsResponse>;
    getCallTimeline: (options?: {
        groupId?: number;
        fromTimestamp?: number;
        number?: number;
        categoryId?: number;
        callType?: string;
        includeCircleCall?: boolean;
        crossGeneration?: boolean;
        excludeRecentGomimushi?: boolean;
        sharedInterestCategories?: boolean;
    }) => Promise<PostsResponse>;
    getConversation: (options: {
        conversationId: number;
        groupId?: number;
        threadId?: number;
        fromPostId?: number;
        reverse?: boolean;
    }) => Promise<PostsResponse>;
    getConversationRootPosts: (options: {
        postIds: number[];
    }) => Promise<PostsResponse>;
    getFollowingCallTimeline: (options?: {
        fromTimestamp?: number;
        number?: number;
        categoryId?: number;
        callType?: string;
        includeCircleCall?: boolean;
        excludeRecentGomimushi?: boolean;
    }) => Promise<PostsResponse>;
    getFollowingTimeline: (options?: {
        from?: string;
        fromPostId?: number;
        onlyRoot?: boolean;
        orderBy?: string;
        number?: number;
        mxn?: number;
        reduceSelfie?: boolean;
        customGenerationRange?: boolean;
    }) => Promise<PostsResponse>;
    getGroupHighlightPosts: (options: {
        groupId: number;
        from?: string;
        number?: number;
    }) => Promise<PostsResponse>;
    getGroupSearchPosts: (options: {
        groupId: number;
        keyword: string;
        fromPostId?: number;
        number?: number;
        onlyThreadPosts?: boolean;
    }) => Promise<PostsResponse>;
    getGroupTimeline: (options: {
        groupId: number;
        fromPostId?: number;
        reverse?: boolean;
        postType?: string;
        number?: number;
        onlyRoot?: boolean;
    }) => Promise<PostsResponse>;
    getHashtagTimeline: (options: {
        tag: number;
        fromPostId?: number;
        number?: number;
    }) => Promise<PostsResponse>;
    getMyPosts: (options?: {
        fromPostId?: number;
        number?: number;
        includeGroupPost?: boolean;
    }) => Promise<PostsResponse>;
    getPost: (options: {
        postId: number;
    }) => Promise<PostResponse>;
    getPostLikers: (options: {
        postId: number;
        fromId?: number;
    }) => Promise<PostLikersResponse>;
    getPostReposts: (options: {
        postId: number;
        fromPostId?: number;
    }) => Promise<PostsResponse>;
    getPosts: (options: {
        postIds: number[];
    }) => Promise<PostsResponse>;
    getRecentEngagementsPosts: (options?: {
        number?: number;
    }) => Promise<PostsResponse>;
    getRecommendedPostTags: (options: {
        tag: string;
        saveRecentSearch?: boolean;
    }) => Promise<PostTagsResponse>;
    getRecommendedPosts: (options?: {
        experimentNum?: number;
        variantNum?: number;
        number?: number;
        saveRecentSearch?: boolean;
    }) => Promise<PostsResponse>;
    getSearchPosts: (options: {
        keyword: string;
        postOwnerScope: number;
        onlyMedia?: boolean;
        fromPostId?: number;
        number?: number;
    }) => Promise<PostsResponse>;
    getTimeline: (options: {
        noreplyMode: boolean;
        orderBy: string;
        experimentOlderAgeRules?: boolean;
        sharedInterestCategories?: boolean;
        from?: string;
        fromPostId?: number;
        number?: number;
        mxn?: number;
        en?: number;
        vn?: number;
        reduceSelfie?: boolean;
        customGenerationRange?: boolean;
    }) => Promise<PostsResponse>;
    getUrlMetadata: (options: {
        url: string;
    }) => Promise<SharedUrl>;
    getUserTimeline: (options: {
        userId: number;
        fromPostId?: number;
        postType?: string;
        number?: number;
    }) => Promise<PostsResponse>;
    likePosts: (options: {
        postIds: number[];
    }) => Promise<LikePostsResponse>;
    removeBookmark: (options: {
        userId: number;
        postId: number;
    }) => Promise<any>;
    removeGroupHighlightPost: (options: {
        groupId: number;
        postId: number;
    }) => Promise<any>;
    removePosts: (options: {
        postIds: number[];
    }) => Promise<any>;
    reportPost: (options: {
        postId: number;
        categoryId?: number;
        reason?: string;
        opponentId?: number;
        screenshotFilename?: string;
        screenshot2Filename?: string;
        screenshot3Filename?: string;
        screenshot4Filename?: string;
    }) => Promise<any>;
    unlikePost: (options: {
        postId: number;
    }) => Promise<any>;
    updatePost: (options: {
        postId: number;
        text?: string;
        fontSize?: number;
        color?: number;
        messageTags?: MessageTag[];
    }) => Promise<Post>;
    updateRecommendationFeedback: (options: {
        postId: number;
        experimentNum?: number;
        variantNum?: number;
        feedbackResult: string;
    }) => Promise<any>;
    validatePost: (options: {
        text: string;
        groupId?: number;
        threadId?: number;
    }) => Promise<ValidationPostResponse>;
    viewVideo: (options: {
        videoId: number;
    }) => Promise<any>;
    voteSurvey: (options: {
        surveyId: number;
        choiceId: number;
    }) => Promise<VoteSurveyResponse>;
    /** @ignore */
    private get uuid();
    /** @ignore */
    private get deviceUuid();
    /** @ignore */
    private get signedInfo();
    /** @ignore */
    private get signedVersion();
}
