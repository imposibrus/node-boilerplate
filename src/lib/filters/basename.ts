
import * as path from 'path';

export default function(env) {
    env.addFilter('basename', (somePath, includeExt = true) => {
        return path.basename(somePath, !includeExt ? path.extname(somePath) : undefined);
    });
}
