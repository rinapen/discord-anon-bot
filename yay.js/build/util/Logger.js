"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YJSLogger = void 0;
const colors_1 = __importDefault(require("colors"));
const winston_1 = __importDefault(require("winston"));
class YJSLogger {
    constructor(debugMode = false, disableLog = false) {
        this.getColor = (level) => {
            switch (level) {
                case 'info':
                    return colors_1.default.green;
                case 'warn':
                    return colors_1.default.yellow;
                case 'error':
                    return colors_1.default.red;
                case 'debug':
                    return colors_1.default.blue;
                default:
                    return colors_1.default.reset;
            }
        };
        this.log = (level, message) => {
            if (!this.disableLog) {
                this.logger.log(level, message);
            }
        };
        this.info = (message) => {
            this.log('info', message);
        };
        this.warn = (message) => {
            this.log('warn', message);
        };
        this.error = (message) => {
            this.log('error', message);
        };
        this.debug = (message) => {
            this.log('debug', message);
        };
        this.setDebugMode = (debugMode) => {
            this.debugMode = debugMode;
            this.logger.level = debugMode ? 'debug' : 'info';
        };
        this.setDisableLog = (disableLog) => {
            this.disableLog = disableLog;
        };
        this.debugMode = debugMode;
        this.disableLog = disableLog;
        this.logger = winston_1.default.createLogger({
            transports: [new winston_1.default.transports.Console()],
            format: winston_1.default.format.printf((log) => {
                const date = new Date();
                const color = this.getColor(log.level);
                const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
                    .map((t) => (t >= 10 ? t : '0' + t))
                    .join(':');
                if (process.stdout.isTTY) {
                    
                    process.stdout.clearLine(0); // ログが重なるのを防ぐため
                }
                return `${colors_1.default.magenta(time)} ${color(`[${log.level.toUpperCase()}]`)} » ${log.message}`;
            }),
            level: this.debugMode ? 'debug' : 'info',
        });
    }
}
exports.YJSLogger = YJSLogger;
