"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAPI = void 0;
/**
 * **レターAPI**
 *
 * @remarks
 * レターAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class ReviewAPI {
    constructor(base) {
        this.base = base;
        this.createReview = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/reviews/${options.userId}`,
                json: { comment: options.comment },
                requireAuth: false,
            });
        };
        this.deleteReviews = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/users/reviews`,
                params: { 'review_ids[]': options.reviewIds },
                requireAuth: false,
            });
        };
        this.getMyReviews = async (options = {}) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/reviews/mine`,
                params: { from_id: options.fromId },
                requireAuth: false,
            });
        };
        this.getReviews = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/reviews/${options.userId}`,
                params: { from_id: options.fromId },
                requireAuth: false,
            });
        };
        this.pinReview = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/pinned/reviews`,
                params: { id: options.reviewId },
                requireAuth: false,
            });
        };
        this.unpinReview = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/pinned/reviews/${options.reviewId}`,
                params: { id: options.reviewId },
                requireAuth: false,
            });
        };
    }
}
exports.ReviewAPI = ReviewAPI;
