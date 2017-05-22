
class LinksGenerator {
    constructor(manifest, chunkName) {
        this.manifest = manifest;
        this.chunkName = chunkName;

        this.commonChunksNames = ['runtime', 'vendor', 'commons'];

        this.allChunks = this.commonChunksNames.concat([this.chunkName]);
    }

    gen() {
        let out = '';

        for (var i = 0; i < this.allChunks.length; i++) {
            var chunk = this.allChunks[i];

            if (this.manifest[chunk]) {
                out += this.template(this.manifest[chunk]);
            }
        }

        return out;
    }

    template() {
        return '';
    }
}

class GenStylesLinks extends LinksGenerator {
    constructor(manifest, chunkName) {
        super(...arguments);
    }

    template(chunk) {
        return chunk['css'] ? `link(rel="stylesheet", href="${chunk['css']}")\n` : '';
    }
}

class GenScriptsLinks extends LinksGenerator {
    constructor(manifest, chunkName) {
        super(...arguments);
    }

    template(chunk) {
        return chunk['js'] ? `script(src="${chunk['js']}")\n` : '';
    }
}

module.exports = {GenStylesLinks, GenScriptsLinks};
