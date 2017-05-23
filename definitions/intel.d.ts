
interface IntelInterface extends IntelLoggerInstance {
    basicConfig(options);
    getLogger(loggerName?: string): IntelLoggerInstance;
}

interface IntelLoggerInstance {
    critical(type: any, ...errors);
    debug(type: any, ...errors);
}

declare module 'intel' {
    export = intel;
}

declare var intel: IntelInterface;
