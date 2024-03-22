"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscAPI = void 0;
const Constants_1 = require("../util/Constants");
/**
 * **雑多API**
 *
 * @remarks
 * カテゴリ化できないAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
class MiscAPI {
    constructor(base) {
        this.base = base;
        this.acceptPolicyAgreement = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/users/policy_agreements/${options.type}`,
                requireAuth: true,
            });
        };
        this.getEmailGrantToken = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `apis/v1/apps/yay/email_grant_tokens`,
                json: { email: options.email, code: options.code },
                requireAuth: false,
                baseURL: Constants_1.ID_CARD_CHECK_URL,
            });
        };
        this.getEmailVerificationPresignedUrl = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/email_verification_urls`,
                json: {
                    device_uuid: this.deviceUuid,
                    email: options.email,
                    locale: options.locale,
                    intent: options.intent,
                },
                requireAuth: false,
            });
        };
        this.getFileUploadPresignedUrls = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/buckets/presigned_urls`,
                params: { 'file_names[]': options.filenames },
                requireAuth: false,
            });
        };
        this.getOldFileUploadPresignedUrl = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/presigned_url`,
                params: { video_file_name: options.videoFilename },
                requireAuth: false,
            });
        };
        this.getPolicyAgreements = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/policy_agreements`,
                requireAuth: false,
            });
        };
        this.getPromotions = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/promotions`,
                params: { page: options.page, number: options.number },
                requireAuth: false,
            });
        };
        this.getVipGameRewardUrl = async (options) => {
            return await this.base.request({
                method: 'GET',
                route: `v1/skyfall/url`,
                params: { device_type: options.deviceType },
                requireAuth: false,
            });
        };
        this.getWebSocketToken = async () => {
            return await this.base.request({
                method: 'GET',
                route: `v1/users/ws_token`,
                requireAuth: false,
            });
        };
        this.svc = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: (await this.getEmailVerificationPresignedUrl({ email: options.email, locale: options.locale })).url,
                json: { email: options.email },
                requireAuth: false,
                baseURL: '',
            });
        };
        this.verifyDevice = async (options) => {
            return await this.base.request({
                method: 'POST',
                route: `v1/genuine_devices/verify`,
                json: {
                    app_version: Constants_1.API_VERSION_NAME,
                    platform: options.platform,
                    device_uuid: this.deviceUuid,
                    verification_string: options.verificationString,
                },
                requireAuth: false,
            });
        };
    }
    // public uploadImage = async (options: { imagePaths: string[]; uploadImageType: string }) => {
    // 	const type: string = options.uploadImageType;
    // 	if (!ImageType[type]) {
    // 		throw new Error("'uploadImageType'が不正です。");
    // 	}
    // 	let _files: Attachment[] = [];
    // 	await Promise.all(
    // 		options.imagePaths.map(async (imagePath, key) => {
    // 			const { filename, extension } = getFilenameAndExtension(imagePath);
    // 			if (!isValidImageFormat(extension)) {
    // 				throw new Error(`画像のフォーマットが不正です。[${filename}]`);
    // 			}
    // 			sharp(imagePath).toBuffer(async (error, file, info) => {
    // 				if (error) {
    // 					throw new Error(error.message);
    // 				} else {
    // 					const resizedImage = info.format === 'gif' ? file : await sharp(file).resize(450).toBuffer();
    // 					const originalAttachment: Attachment = {
    // 						file: file,
    // 						fileName: '',
    // 						originalFileName: filename,
    // 						originalExtension: extension,
    // 						naturalWidth: info.width,
    // 						naturalHeight: info.height,
    // 						isThumb: false,
    // 					};
    // 					const thumbnailAttachment: Attachment = {
    // 						...originalAttachment,
    // 						file: resizedImage,
    // 						isThumb: true,
    // 					};
    // 					const shortUuid: string = uuid().replace(/-/g, '').slice(0, 16);
    // 					originalAttachment.fileName = getHashedFilename(originalAttachment, type, key, shortUuid);
    // 					thumbnailAttachment.fileName = getHashedFilename(thumbnailAttachment, type, key, shortUuid);
    // 				}
    // 			});
    // 		}),
    // 	);
    // };
    /** @ignore */
    get uuid() {
        return this.base.uuid;
    }
    /** @ignore */
    get deviceUuid() {
        return this.base.deviceUuid;
    }
}
exports.MiscAPI = MiscAPI;
