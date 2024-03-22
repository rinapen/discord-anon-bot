import { Cookie } from './Cookie';
import { Device } from './Types';
export declare class HeaderInterceptor {
    private clientIP;
    private connectionSpeed;
    private connectionType;
    private userAgent;
    private device;
    private deviceInfo;
    private cookie;
    private locale;
    private contentType;
    constructor(device: Device, cookie: Cookie, locale?: string);
    intercept: () => Record<string, any>;
    getClientIP: () => string;
    getConnectionSpeed: () => string;
    setClientIP: (clientIP: string) => void;
    setConnectionSpeed: (connectionSpeed: string) => void;
}
