"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAPI = void 0;
/**
 * **ゲームAPI**
 *
 * @remarks
 * ゲームAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class GameAPI {
    constructor(base) {
        this.base = base;
        this.getWalkthroughs = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/games/apps/${options.appId}/walkthroughs`,
                requireAuth: false,
            });
        };
        this.requestWalkthrough = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/groups/${options.groupId}/request_walkthrough`,
                requireAuth: false,
            });
        };
    }
}
exports.GameAPI = GameAPI;
