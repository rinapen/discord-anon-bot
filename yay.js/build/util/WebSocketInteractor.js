"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketInteractor = void 0;
const node_events_1 = __importDefault(require("node:events"));
const ws_1 = __importDefault(require("ws"));
const Constants_1 = require("./Constants");
const Events_1 = require("./Events");
const Types_1 = require("./Types");
const CaseConverter_1 = require("./CaseConverter");
class WebSocketInteractor extends node_events_1.default {
    constructor(base) {
        super();
        this.connect = (wsToken, intents) => {
            this.ws = new ws_1.default(`${Constants_1.WEB_SOCKET_URL}?token=${wsToken}&app_version=${Constants_1.VERSION_NAME}`);
            this.ws.on('message', (message) => {
                const eventMessage = JSON.parse(message);
                if (eventMessage.type === 'ping') {
                    return; // ignore ping events
                }
                if (eventMessage.type === 'welcome') {
                    for (const intent of intents) {
                        this.subscribe(intent);
                    }
                    this.base.emit(Events_1.Events.ClientReady, eventMessage.sid);
                    return;
                }
                if (eventMessage.type === 'confirm_subscription' && eventMessage.identifier) {
                    const identifier = JSON.parse(eventMessage.identifier);
                    this.base.logger.debug(`Connected to Gateway -> [${identifier.channel}]`);
                    return;
                }
                const content = eventMessage.message;
                if (content && eventMessage.identifier && content.event) {
                    const identifier = JSON.parse(eventMessage.identifier);
                    switch (identifier.channel) {
                        case Types_1.GatewayIntents.ChatMessage:
                            switch (content.event) {
                                case 'new_message':
                                    if (content.message) {
                                        this.base.emit(Events_1.Events.MessageCreate, (0, CaseConverter_1.objectToCamel)(content.message));
                                    }
                                    break;
                                case 'chat_deleted':
                                    this.base.emit(Events_1.Events.ChatRoomDelete, content.data?.room_id);
                                    break;
                                case 'total_chat_request':
                                    this.base.emit(Events_1.Events.ChatRequest, content.data?.total_count);
                                    break;
                            }
                            break;
                        case Types_1.GatewayIntents.GroupUpdates:
                            if (content.event === 'new_post') {
                                this.base.emit(Events_1.Events.GroupUpdate, content.data?.group_id);
                            }
                            break;
                    }
                }
            });
            this.ws.on('close', (code, reason) => {
                if (reason.toString().toLowerCase() === 'auth failed') {
                    this.base.emit(Events_1.Events.WebSocketTokenExpire);
                }
                this.base.logger.debug(`WebSocket closed with code: ${code}`);
                this.base.logger.debug(`Reason: ${reason.toString()}`);
            });
            this.ws.on('error', (error) => {
                this.base.logger.error(`WebSocket Error: ${error.message}`);
            });
        };
        this.sendChannelCommand = (command, intent) => {
            if (!this.ws)
                return;
            const channelJSON = {
                command: command,
                identifier: JSON.stringify({ channel: intent }),
            };
            this.ws.send(JSON.stringify(channelJSON));
        };
        this.subscribe = (intent) => {
            this.sendChannelCommand('subscribe', intent);
        };
        this.unsubscribe = (intent) => {
            this.sendChannelCommand('unsubscribe', intent);
        };
        this.base = base;
        this.ws = undefined;
    }
}
exports.WebSocketInteractor = WebSocketInteractor;
