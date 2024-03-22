"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.md5 = exports.getPostType = exports.buildMessageTags = exports.mention = exports.getHashedFilename = exports.isValidImageFormat = exports.getFilenameAndExtension = void 0;
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const Constants_1 = require("./Constants");
const Errors_1 = require("./Errors");
const getFilenameAndExtension = (filePath) => {
    const filename = path_1.default.basename(filePath);
    const extension = path_1.default.extname(filePath);
    return { filename, extension };
};
exports.getFilenameAndExtension = getFilenameAndExtension;
const isValidImageFormat = (extension) => {
    return /\.(jpg|jpeg|png|gif)$/.test(extension);
};
exports.isValidImageFormat = isValidImageFormat;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getHashedFilename = (att, type, key, uuid) => {
    return '';
};
exports.getHashedFilename = getHashedFilename;
/**
 * **ユーザーをメンションします**
 *
 * @param options.userId - ユーザーID
 *
 * @example
 * ```javascript
 * import { Client, mention } from 'yay.js';
 *
 * const main = async () => {
 * 	const client = new Client();
 *
 * 	await client.login({
 * 		email: 'yourEmail',
 * 		password: 'yourPassword',
 * 	});
 *
 * 	client.createPost({
 * 		text: `こんにちは、${mention({userId: 15184, displayName: 'アルパカ'})}さん！`
 * 	});
 * };
 * ```
 *
 * @see https://github.com/qvco/yay.js
 */
const mention = (options) => {
    if (!options.displayName.length) {
        throw new Errors_1.YJSError('displayNameは空白にできません。');
    }
    return `<@>${options.userId}:@${options.displayName}<@/>`;
};
exports.mention = mention;
/** @ignore */
const buildMessageTags = (text) => {
    const messageTags = [];
    const regex = /<@>(\d+):([^<]+)<@\/>/g;
    let result;
    let offsetAdjustment = 0;
    while ((result = regex.exec(text)) !== null) {
        const fullMatchLength = result[0].length;
        const displayNameLength = result[2].length;
        messageTags.push({
            type: 'user',
            userId: Number(result[1]),
            offset: result.index - offsetAdjustment,
            length: result[2].length,
        });
        offsetAdjustment += fullMatchLength - displayNameLength;
    }
    return messageTags;
};
exports.buildMessageTags = buildMessageTags;
/** @ignore */
const getPostType = (options) => {
    if (options.choices) {
        return 'survey';
    }
    else if (options.sharedUrl) {
        return 'shareable_url';
    }
    else if (options.videoFileName) {
        return 'video';
    }
    else if (options.attachmentFileName) {
        return 'image';
    }
    else {
        return 'text';
    }
};
exports.getPostType = getPostType;
/** @ignore */
const md5 = (uuid, timestamp, requireSharedKey) => {
    const sharedKey = requireSharedKey ? Constants_1.SHARED_KEY : '';
    return (0, crypto_1.createHash)('md5')
        .update(Constants_1.API_KEY + uuid + timestamp.toString() + sharedKey)
        .digest('hex');
};
exports.md5 = md5;
/** @ignore */
const sha256 = () => {
    const message = util_1.default.format('yay_android/%s', Constants_1.API_VERSION_NAME);
    return (0, crypto_1.createHmac)('sha256', Constants_1.API_VERSION_KEY).update(message).digest('base64');
};
exports.sha256 = sha256;
