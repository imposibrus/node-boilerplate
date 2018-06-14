
module.exports = class RequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestError';
        Error.captureStackTrace(this, this.constructor);
    }
};
