
import * as path from 'path';

const documentRoot = process.cwd(),
    publicDir = path.join(documentRoot, 'public'),
    storage = path.join(publicDir, 'storage'),
    media = path.join(storage, 'media');

export default {
    documentRoot,
    publicDir,
    storage,
    media,
};
