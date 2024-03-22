"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = void 0;
const axios_1 = __importDefault(require("axios"));
const CaseConverter_1 = require("./CaseConverter");
const Constants_1 = require("./Constants");
class REST {
    constructor(options) {
        this.filterRequests = (obj) => {
            if (!obj) {
                return undefined;
            }
            const newObj = {};
            for (const key in obj) {
                if (obj[key] !== undefined) {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        };
        this.request = async (options) => {
            const config = {
                method: options.method,
                url: options.route,
                params: this.filterRequests(options.params),
                data: this.filterRequests(options.json),
                headers: options.headers,
                baseURL: options.baseURL,
            };
            const requestDetails = 'Making API request:\n\n' +
                `${JSON.stringify(config.method)}: ${JSON.stringify(config.url)}\n\n` +
                `Parameters: ${JSON.stringify(config.params)}\n\n` +
                `Headers: ${JSON.stringify(config.headers)}\n\n` +
                `Body: ${JSON.stringify(config.data)}\n`;
            this.logger.debug(requestDetails);
            const response = await this.api(config);
            const { status, data } = response;
            response.data = (0, CaseConverter_1.objectToCamel)(data);
            const responseDetails = 'Received API response:\n\n' + `Status code: ${status}\n\n` + `Response: ${JSON.stringify(response.data)}`;
            this.logger.debug(responseDetails);
            return response;
        };
        this.logger = options.logger;
        this.api = axios_1.default.create({
            baseURL: options.baseURL ?? Constants_1.BASE_API_URL,
            proxy: options.proxy,
            timeout: options.timeout ?? 30000,
            headers: options.defaultHeaders,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            validateStatus: function (status) {
                return true;
            },
        });
    }
}
exports.REST = REST;
