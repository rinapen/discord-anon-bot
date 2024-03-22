import { BaseClient } from '../client/BaseClient';
import { ApplicationConfigResponse, BanWordsResponse, PopularWordsResponse } from '../util/Responses';
/**
 * **設定API**
 *
 * @remarks
 * アプリの基本情報を取得するAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class ConfigAPI {
    private readonly base;
    constructor(base: BaseClient);
    getAppConfig: () => Promise<ApplicationConfigResponse>;
    getBanWords: (options: {
        countryApiValue: string;
    }) => Promise<BanWordsResponse>;
    getPopularWords: (options: {
        countryApiValue: string;
    }) => Promise<PopularWordsResponse>;
}
