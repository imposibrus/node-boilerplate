
const path = require('path'),
    requireAll = require('require-all'),
    extensions = requireAll(path.join(__dirname, './extensions')),
    filters = requireAll(path.join(__dirname, './filters'));

module.exports = function(env, nunjucks) {
    for (const extName in extensions) {
        if (!Object.prototype.hasOwnProperty.call(extensions, extName)) {
            continue;
        }

        const extension = extensions[extName];

        if (typeof extension === 'function') {
            extension(env, nunjucks);
        }
    }
    for (const filterName in filters) {
        if (!Object.prototype.hasOwnProperty.call(filters, filterName)) {
            continue;
        }

        const filter = filters[filterName];

        if (typeof filter === 'function') {
            filter(env, nunjucks);
        }
    }
};
