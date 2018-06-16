
interface IntelInterface extends IntelLoggerInstance {
    basicConfig(options: any): IntelLoggerInstance;
    getLogger(loggerName?: string): IntelLoggerInstance;
}

interface IntelLoggerInstance {
    critical(type: any, ...errors: any[]): any;
    debug(type: any, ...errors: any[]): any;
}

declare module 'intel' {
    export = intel;
}

declare var intel: IntelInterface;
