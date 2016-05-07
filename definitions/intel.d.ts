
interface IntelInterface {
    basicConfig(options);
    getLogger(loggerName?: string);
}

declare module 'intel' {
    export = intel;
}

declare var intel: IntelInterface;
