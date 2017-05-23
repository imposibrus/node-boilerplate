
export default function(env, nunjucks) {
    function SessionFlashExtension(this: Nunjucks.Extension) {
        this.tags = ['flash'];

        // tslint:disable-next-line:only-arrow-functions
        this.parse = function(parser, nodes/*, lexer*/) {
            const tok = parser.nextToken(),
                args = parser.parseSignature(null, true);

            parser.advanceAfterBlockEnd(tok.value);

            const body = parser.parseUntilBlocks('endflash');

            parser.advanceAfterBlockEnd();

            return new nodes.CallExtension(this, 'run', args, [body]);
        };

        // tslint:disable-next-line:only-arrow-functions
        this.run = function(context, flash, body) {
            let ret = '';

            for (const type in flash) {
                if (Object.prototype.hasOwnProperty.call(flash, type)) {
                    const messages: string[] = flash[type];
                    let message;

                    context.ctx.type = type;

                    // tslint:disable-next-line:no-conditional-assignment
                    while (message = messages.shift()) {
                        context.ctx.message = message;
                        ret += body();
                    }
                }
            }

            return new nunjucks.runtime.SafeString(ret);
        };
    }

    env.addExtension('SessionFlashExtension', new SessionFlashExtension());
}
