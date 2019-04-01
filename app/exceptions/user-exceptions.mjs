export class InvalidUserException extends Error {
    constructor(message) {
        super();
        this.name = "InvalidUserException";
        this.message = message;
    }
}