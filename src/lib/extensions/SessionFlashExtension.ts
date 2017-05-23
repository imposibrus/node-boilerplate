
export default function(env, nunjucks) {
    function SessionFlashExtension(this: Nunjucks.Extension) {
        this.tags = ['flash'];

        this.parse = function(parser, nodes/*, lexer*/) {
            let tok = parser.nextToken(),
                args = parser.parseSignature(null, true),
                body;

            parser.advanceAfterBlockEnd(tok.value);

            body = parser.parseUntilBlocks('endflash');

            parser.advanceAfterBlockEnd();

            return new nodes.CallExtension(this, 'run', args, [body]);
        };

        this.run = function(context, flash, body) {
            let ret = '';

            for (let type in flash) {
                if (Object.prototype.hasOwnProperty.call(flash, type)) {
                    let messages: string[] = flash[type],
                        message;

                    context.ctx.type = type;

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
};
