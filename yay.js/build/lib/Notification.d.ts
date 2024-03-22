import { BaseClient } from '../client/BaseClient';
import { ActivitiesResponse } from '../util/Responses';
/**
 * **通知API**
 *
 * @remarks
 * 通知APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export declare class NotificationAPI {
    private readonly base;
    constructor(base: BaseClient);
    getUserActivities: (options: {
        important?: boolean;
        fromTimestamp?: number;
        number?: number;
    }) => Promise<ActivitiesResponse>;
    getUserMergedActivities: (options: {
        fromTimestamp?: number;
    }) => Promise<ActivitiesResponse>;
    receivedNotification: (options: {
        pid: string;
        type: string;
        openedAt?: number;
    }) => Promise<any>;
}
