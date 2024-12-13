export default class NotFoundError extends Error {
    statusCode: number = 404;

    constructor(message?: string) {
        super(message);
    }
}