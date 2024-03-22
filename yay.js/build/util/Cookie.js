"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const uuid_1 = require("uuid");
const Errors_1 = require("./Errors");
const defaultFilePath = process.cwd() + '/';
class Cookie {
    constructor(saveCookie = true, dirPath = defaultFilePath, filename = 'cookie.json', password) {
        this.isEncrypted = (cookie) => {
            return cookie.authentication.accessToken.includes(':');
        };
        this.generateKey = (password) => {
            const key = Buffer.alloc(32);
            const passwordBuffer = Buffer.from(password, 'utf8');
            passwordBuffer.copy(key);
            return key;
        };
        this.encrypt = (text) => {
            if (this.encryptionKey) {
                const iv = crypto.randomBytes(16);
                const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
                let encrypted = cipher.update(text);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                return iv.toString('hex') + ':' + encrypted.toString('hex');
            }
            else {
                throw new Errors_1.YJSError('パスワードが設定されていません。');
            }
        };
        this.decrypt = (text) => {
            if (this.encryptionKey) {
                const [ivHex, encryptedTextHex] = text.split(':');
                const iv = Buffer.from(ivHex, 'hex');
                const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
                let decrypted = decipher.update(encryptedTextHex, 'hex', 'utf-8');
                decrypted += decipher.final('utf-8');
                return decrypted;
            }
            else {
                throw new Errors_1.YJSError('パスワードが設定されていません。');
            }
        };
        this.encryptCookie = (cookie) => {
            return {
                ...cookie,
                user: {
                    ...cookie.user,
                    uuid: this.encrypt(cookie.user.uuid),
                },
                device: {
                    ...cookie.device,
                    deviceUuid: this.encrypt(cookie.device.deviceUuid),
                },
                authentication: {
                    ...cookie.authentication,
                    accessToken: this.encrypt(cookie.authentication.accessToken),
                    refreshToken: this.encrypt(cookie.authentication.refreshToken),
                },
            };
        };
        this.decryptCookie = (cookie) => {
            return {
                ...cookie,
                user: {
                    ...cookie.user,
                    uuid: this.decrypt(cookie.user.uuid),
                },
                device: {
                    ...cookie.device,
                    deviceUuid: this.decrypt(cookie.device.deviceUuid),
                },
                authentication: {
                    ...cookie.authentication,
                    accessToken: this.decrypt(cookie.authentication.accessToken),
                    refreshToken: this.decrypt(cookie.authentication.refreshToken),
                },
            };
        };
        this.set = (cookie) => {
            this.email = cookie.user.email;
            this.userId = cookie.user.userId;
            this.uuid = cookie.user.uuid;
            this.deviceUuid = cookie.device.deviceUuid;
            this.accessToken = cookie.authentication.accessToken;
            this.refreshToken = cookie.authentication.refreshToken;
        };
        this.hash = (str) => {
            const sha256Hash = crypto.createHash('sha256');
            sha256Hash.update(str);
            return sha256Hash.digest('hex');
        };
        this.get = () => {
            return {
                authentication: { accessToken: this.accessToken, refreshToken: this.refreshToken },
                user: { email: this.email, userId: this.userId, uuid: this.uuid },
                device: { deviceUuid: this.deviceUuid },
            };
        };
        this.getEncrypted = () => {
            const cookie = this.encryptCookie(this.get());
            cookie.user.email = this.hash(cookie.user.email);
            return cookie;
        };
        this.getDecrypted = (encryptedCookie) => {
            return this.decryptCookie(encryptedCookie);
        };
        this.save = (cookie) => {
            if (!this.saveCookie) {
                return;
            }
            if (!cookie) {
                cookie = this.get();
                if (this.encryptionKey) {
                    cookie = this.encryptCookie(cookie);
                }
            }
            cookie.user.email = this.hash(cookie.user.email);
            fs.writeFileSync(this.filePath, JSON.stringify(cookie), 'utf-8');
        };
        this.load = (email) => {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            let loadedCookie = JSON.parse(data);
            if (this.hash(email) !== loadedCookie.user.email) {
                throw new Errors_1.YJSError('メールアドレスが一致しませんでした。');
            }
            loadedCookie.user.email = email;
            const isEncrypted = this.isEncrypted(loadedCookie);
            if (isEncrypted && !this.encryptionKey) {
                throw new Errors_1.YJSError('このクッキーは暗号化されています。');
            }
            if (this.encryptionKey) {
                if (!isEncrypted) {
                    loadedCookie = this.encryptCookie(loadedCookie);
                    this.save(loadedCookie);
                }
                loadedCookie = this.decryptCookie(loadedCookie);
            }
            this.set(loadedCookie);
            return this.get();
        };
        this.destroy = () => {
            try {
                fs.unlinkSync(this.filePath);
            }
            catch (error) {
                throw new Errors_1.YJSError('クッキーデータの削除に失敗しました。');
            }
        };
        this.algorithm = 'aes-256-ctr';
        this.saveCookie = saveCookie;
        this.filePath = dirPath + filename;
        this.email = '';
        this.userId = 0;
        this.uuid = (0, uuid_1.v4)();
        this.deviceUuid = (0, uuid_1.v4)();
        this.accessToken = '';
        this.refreshToken = '';
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        if (password) {
            this.encryptionKey = this.generateKey(password);
        }
    }
}
exports.Cookie = Cookie;
