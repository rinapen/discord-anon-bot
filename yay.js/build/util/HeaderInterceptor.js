"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderInterceptor = void 0;
const Constants_1 = require("./Constants");
class HeaderInterceptor {
    constructor(device, cookie, locale = 'ja') {
        this.intercept = () => {
            const headers = {
                Host: Constants_1.BASE_HOST,
                'User-Agent': this.userAgent,
                'X-Timestamp': Date.now().toString(),
                'X-App-Version': Constants_1.API_VERSION_NAME,
                'X-Device-Info': this.deviceInfo,
                'X-Device-UUID': this.cookie.deviceUuid,
                'X-Client-IP': this.clientIP,
                'X-Connection-Type': this.connectionType,
                'X-Connection-Speed': this.connectionSpeed,
                'Accept-Language': this.locale,
                'Content-Type': this.contentType,
            };
            if (this.clientIP.length > 0) {
                headers['X-Client-IP'] = this.clientIP;
            }
            if (this.cookie.accessToken.length > 0) {
                headers.Authorization = 'Bearer ' + this.cookie.accessToken;
            }
            return headers;
        };
        this.getClientIP = () => {
            return this.clientIP;
        };
        this.getConnectionSpeed = () => {
            return this.connectionSpeed;
        };
        this.setClientIP = (clientIP) => {
            this.clientIP = clientIP;
        };
        this.setConnectionSpeed = (connectionSpeed) => {
            this.connectionSpeed = connectionSpeed;
        };
        this.device = device;
        this.locale = locale;
        this.userAgent = `${this.device.deviceType} ${this.device.osVersion} (${this.device.screenDensity}x ${this.device.screenSize} ${this.device.model})`;
        this.deviceInfo = 'yay ' + Constants_1.VERSION_NAME + ' ' + this.userAgent;
        this.cookie = cookie;
        this.connectionType = 'wifi';
        this.contentType = 'application/json;charset=UTF-8';
        this.clientIP = '';
        this.connectionSpeed = '';
    }
}
exports.HeaderInterceptor = HeaderInterceptor;
