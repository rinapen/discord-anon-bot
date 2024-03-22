"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigAPI = void 0;
const Constants_1 = require("../util/Constants");
/**
 * **設定API**
 *
 * @remarks
 * アプリの基本情報を取得するAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class ConfigAPI {
    constructor(base) {
        this.base = base;
        this.getAppConfig = async () => {
            return await this.base.request({
                method: 'GET',
                baseURL: Constants_1.BASE_CONFIG_URL,
                route: `api/apps/yay`,
                requireAuth: false,
            });
        };
        this.getBanWords = async (options) => {
            return await this.base.request({
                method: 'GET',
                baseURL: Constants_1.BASE_CONFIG_URL,
                route: `${options.countryApiValue}/api/v2/banned_words`,
                requireAuth: false,
            });
        };
        this.getPopularWords = async (options) => {
            return await this.base.request({
                method: 'GET',
                baseURL: Constants_1.BASE_CONFIG_URL,
                route: `${options.countryApiValue}/api/apps/yay/popular_words`,
                requireAuth: false,
            });
        };
    }
}
exports.ConfigAPI = ConfigAPI;
