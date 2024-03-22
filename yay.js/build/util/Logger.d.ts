export declare class YJSLogger {
    private logger;
    private debugMode;
    private disableLog;
    constructor(debugMode?: boolean, disableLog?: boolean);
    private getColor;
    private log;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    debug: (message: string) => void;
    setDebugMode: (debugMode: boolean) => void;
    setDisableLog: (disableLog: boolean) => void;
}
