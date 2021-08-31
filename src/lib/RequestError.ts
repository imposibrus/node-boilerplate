
export default class RequestError extends Error {
    public stack: string;

    constructor(public message: string, public status?: number) {
        super(message);
        this.name = 'RequestError';
        Error.captureStackTrace(this, this.constructor);
    }
}
