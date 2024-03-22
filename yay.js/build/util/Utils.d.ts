import { Attachment, MessageTag } from './Models';
export declare const getFilenameAndExtension: (filePath: string) => {
    filename: string;
    extension: string;
};
export declare const isValidImageFormat: (extension: string) => boolean;
export declare const getHashedFilename: (att: Attachment, type: string, key: number, uuid: string) => string;
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
export declare const mention: (options: {
    userId: number;
    displayName: string;
}) => string;
/** @ignore */
export declare const buildMessageTags: (text: string) => MessageTag[];
/** @ignore */
export declare const getPostType: (options: Record<string, any>) => string;
/** @ignore */
export declare const md5: (uuid: string, timestamp: number, requireSharedKey: boolean) => string;
/** @ignore */
export declare const sha256: () => string;
