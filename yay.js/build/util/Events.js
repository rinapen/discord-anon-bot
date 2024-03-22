"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
/**
 * リッスンイベント
 *
 * @remarks
 * WebSocket通信等でリッスンするイベントです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
exports.Events = {
    ChatRequest: 'chatRequest',
    ChatRoomDelete: 'chatRoomDelete',
    ClientReady: 'ready',
    MessageCreate: 'messageCreate',
    GroupUpdate: 'groupUpdate',
    WebSocketTokenExpire: 'webSocketTokenExpire',
};
