import { Walkthrough } from '../util/Models';
import { BaseClient } from '../client/BaseClient';
/**
 * **ゲームAPI**
 *
 * @remarks
 * ゲームAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class GameAPI {
    private readonly base;
    constructor(base: BaseClient);
    getWalkthroughs: (options: {
        appId: number;
    }) => Promise<Walkthrough[]>;
    requestWalkthrough: (options: {
        groupId: number;
    }) => Promise<any>;
}
