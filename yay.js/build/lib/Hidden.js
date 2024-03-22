"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenAPI = void 0;
/**
 * **非表示API**
 *
 * @remarks
 * コンテンツやユーザーを非表示にするAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class HiddenAPI {
    constructor(base) {
        this.base = base;
        this.getList = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/hidden/users`,
                params: { from: options.from, number: options.number },
                requireAuth: false,
            });
        };
        this.hideUser = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/hidden/users`,
                json: { user_id: options.userId },
                requireAuth: false,
            });
        };
        this.unHideUsers = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/hidden/users`,
                params: { 'user_ids[]': options.userIds },
                requireAuth: false,
            });
        };
    }
}
exports.HiddenAPI = HiddenAPI;
