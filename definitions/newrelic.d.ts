
interface NewRelicInterface {
    getBrowserTimingHeader();
}

declare module 'newrelic' {
    export = newrelic;
}

declare var newrelic: NewRelicInterface;
