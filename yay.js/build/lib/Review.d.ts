import { BaseClient } from '../client/BaseClient';
import { ReviewsResponse } from '../util/Responses';
/**
 * **レターAPI**
 *
 * @remarks
 * レターAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class ReviewAPI {
    private readonly base;
    constructor(base: BaseClient);
    createReview: (options: {
        userId: number;
        comment: string;
    }) => Promise<any>;
    deleteReviews: (options: {
        reviewIds: number[];
    }) => Promise<any>;
    getMyReviews: (options?: {
        fromId?: number;
    }) => Promise<ReviewsResponse>;
    getReviews: (options: {
        userId: number;
        fromId?: number;
    }) => Promise<ReviewsResponse>;
    pinReview: (options: {
        reviewId: number;
    }) => Promise<any>;
    unpinReview: (options: {
        reviewId: number;
    }) => Promise<any>;
}
