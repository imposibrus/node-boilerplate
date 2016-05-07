
declare module Express {
    export interface SessionMessage {
        type?: string;
        message?: string;
    }
    export interface Session {
        messages: SessionMessage[];
        auth: boolean;
    }
}

