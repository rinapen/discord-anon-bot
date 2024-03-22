import { BaseClient } from '../client/BaseClient';
import { BlockedUserIdsResponse, BlockedUsersResponse } from '../util/Responses';
/**
 * **ブロックAPI**
 *
 * @remarks
 * ユーザーブロックAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class BlockAPI {
    private readonly base;
    constructor(base: BaseClient);
    blockUser: (options: {
        userId: number;
    }) => Promise<any>;
    getBlockedUserIds: () => Promise<BlockedUserIdsResponse>;
    getBlockedUsers: (options?: {
        nickname?: string;
        username?: string;
        biography?: string;
        prefecture?: string;
        gender?: number;
        fromId?: number;
    }) => Promise<BlockedUsersResponse>;
    unblockUser: (options: {
        userId: number;
    }) => Promise<any>;
}
