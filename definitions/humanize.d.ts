
interface HumanizeInterface {
    pad(str: string, count: number, padChar?: string, type?: string);
}

declare module 'humanize' {
    export = humanize;
}

declare var humanize: HumanizeInterface;
