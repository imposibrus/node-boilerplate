
const path = require('path');

module.exports = function(env) {
    env.addFilter('basename', (somePath, includeExt = true) => {
        return path.basename(somePath, !includeExt ? path.extname(somePath) : undefined);
    });
};
