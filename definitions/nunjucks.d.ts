
declare namespace Nunjucks {
    export interface Extension {
        tags: string[];
        // Parser API is undocumented it is suggested to check the source: https://github.com/mozilla/nunjucks/blob/master/src/parser.js
        parse(parser: any, nodes: any, lexer: any): any;
        run(context: any, args: any, body: (...args: any[]) => any): any;
    }
}
