
export default class RequestError extends Error {
    public status: number;
    public stack: string;

    constructor(public message: string) {
        super(message);
        this.name = 'RequestError';
        Error.captureStackTrace(this, this.constructor);
    }
}
