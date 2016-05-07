
interface NewRelicInterface { }

declare module 'newrelic' {
    export = newrelic;
}

declare var newrelic: NewRelicInterface;
