"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationAPI = void 0;
const Constants_1 = require("../util/Constants");
/**
 * **通知API**
 *
 * @remarks
 * 通知APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class NotificationAPI {
    constructor(base) {
        this.base = base;
        this.getUserActivities = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `api/user_activities`,
                params: { important: options.important, from_timestamp: options.fromTimestamp, number: options.number },
                baseURL: Constants_1.BASE_CASSANDRA_URL,
                requireAuth: false,
            });
        };
        this.getUserMergedActivities = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `api/v2/user_activities`,
                params: { from_timestamp: options.fromTimestamp },
                baseURL: Constants_1.BASE_CASSANDRA_URL,
                requireAuth: false,
            });
        };
        this.receivedNotification = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `api/received_push_notifications`,
                json: {
                    pid: options.pid,
                    type: options.type,
                    opened_at: options.openedAt,
                },
                baseURL: Constants_1.BASE_CASSANDRA_URL,
                requireAuth: false,
            });
        };
    }
}
exports.NotificationAPI = NotificationAPI;
