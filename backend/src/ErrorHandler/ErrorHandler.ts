export class ErrorHandler extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status
    }
    static NotFound(message: string) {
        return new ErrorHandler(404, message);
    }

    static BadRequest(message: string) {
        return new ErrorHandler(400, message);
    }

    static Internal(message: string) {
        return new ErrorHandler(500, message);
    }
    static Unauthorized(message: string) {
        return new ErrorHandler(401, message);
    }
}