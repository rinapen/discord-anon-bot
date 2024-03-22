"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuteKeywordAPI = void 0;
/**
 * **ミュートキーワードAPI**
 *
 * @remarks
 * 特定のキーワードのミュート設定APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class MuteKeywordAPI {
    constructor(base) {
        this.base = base;
        this.createKeyword = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/hidden/words`,
                requireAuth: false,
                json: { word: options.word, context: options.context },
            });
        };
        this.deleteKeyword = async (options) => {
            return await this.base.request({
                method: 'DELETE',
                route: `v1/hidden/words`,
                requireAuth: false,
                params: { 'ids[]': options.keywordIds },
            });
        };
        this.getKeywords = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/hidden/words`,
                requireAuth: false,
            });
        };
        this.updateKeyword = async (options) => {
            return await this.base.request({
                method: 'PUT',
                route: `v1/hidden/words/${options.keywordId}`,
                requireAuth: false,
                json: { word: options.word, context: options.context },
            });
        };
    }
}
exports.MuteKeywordAPI = MuteKeywordAPI;
