"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockAPI = void 0;
/**
 * **ブロックAPI**
 *
 * @remarks
 * ユーザーブロックAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class BlockAPI {
    constructor(base) {
        this.base = base;
        this.blockUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/${options.userId}/block`,
                requireAuth: true,
            });
        };
        this.getBlockedUserIds = async () => {
            return await this.base.request({ method: 'GET', route: `v1/users/block_ids`, requireAuth: true });
        };
        this.getBlockedUsers = async (options = {}) => {
            return await this.base.request({
                method: 'POST',
                route: `v2/users/blocked`,
                requireAuth: true,
                params: {
                    nickname: options.nickname,
                    username: options.username,
                    biography: options.biography,
                    prefecture: options.prefecture,
                    gender: options.gender,
                    from_id: options.fromId,
                },
            });
        };
        this.unblockUser = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v2/users/${options.userId}/unblock`,
                requireAuth: true,
            });
        };
    }
}
exports.BlockAPI = BlockAPI;
