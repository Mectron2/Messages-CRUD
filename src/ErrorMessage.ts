export default class ErrorMessage extends Error {
    private readonly statusCode: number;

    constructor(errorCode: number, errorMessage: string) {
        super(errorMessage);
        this.statusCode = errorCode;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getErrorMessage(): string {
        return this.message;
    }
}
