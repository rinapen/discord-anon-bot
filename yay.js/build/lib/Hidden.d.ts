import { BaseClient } from '../client/BaseClient';
import { HiddenResponse } from '../util/Responses';
/**
 * **非表示API**
 *
 * @remarks
 * コンテンツやユーザーを非表示にするAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class HiddenAPI {
    private readonly base;
    constructor(base: BaseClient);
    getList: (options: {
        from?: string;
        number?: number;
    }) => Promise<HiddenResponse>;
    hideUser: (options: {
        userId: number;
    }) => Promise<any>;
    unHideUsers: (options: {
        userIds: number[];
    }) => Promise<any>;
}
