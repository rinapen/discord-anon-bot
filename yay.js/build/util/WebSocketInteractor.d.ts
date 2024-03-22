/// <reference types="node" />
import EventEmitter from 'node:events';
import { BaseClient } from '../client/BaseClient';
export declare class WebSocketInteractor extends EventEmitter {
    private base;
    private ws;
    constructor(base: BaseClient);
    connect: (wsToken: string, intents: string[]) => void;
    private sendChannelCommand;
    subscribe: (intent: string) => void;
    unsubscribe: (intent: string) => void;
}
