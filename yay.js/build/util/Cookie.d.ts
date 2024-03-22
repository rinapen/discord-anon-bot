import { CookieProps } from './Types';
export declare class Cookie {
    private algorithm;
    private saveCookie;
    private filePath;
    private encryptionKey;
    email: string;
    userId: number;
    uuid: string;
    deviceUuid: string;
    accessToken: string;
    refreshToken: string;
    constructor(saveCookie?: boolean, dirPath?: string, filename?: string, password?: string);
    private isEncrypted;
    private generateKey;
    private encrypt;
    private decrypt;
    private encryptCookie;
    private decryptCookie;
    set: (cookie: CookieProps) => void;
    hash: (str: string) => string;
    get: () => CookieProps;
    getEncrypted: () => CookieProps;
    getDecrypted: (encryptedCookie: CookieProps) => CookieProps;
    save: (cookie?: CookieProps) => void;
    load: (email: string) => CookieProps;
    destroy: () => void;
}
