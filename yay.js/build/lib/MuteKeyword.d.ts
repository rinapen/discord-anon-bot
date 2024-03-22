import { BaseClient } from '../client/BaseClient';
import { CreateMuteKeywordResponse, MuteKeywordResponse } from '../util/Responses';
/**
 * **ミュートキーワードAPI**
 *
 * @remarks
 * 特定のキーワードのミュート設定APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class MuteKeywordAPI {
    private readonly base;
    constructor(base: BaseClient);
    createKeyword: (options: {
        word: string;
        context: string[];
    }) => Promise<CreateMuteKeywordResponse>;
    deleteKeyword: (options: {
        keywordIds: number[];
    }) => Promise<any>;
    getKeywords: () => Promise<MuteKeywordResponse>;
    updateKeyword: (options: {
        keywordId: number;
        word: string;
        context: string[];
    }) => Promise<CreateMuteKeywordResponse>;
}
