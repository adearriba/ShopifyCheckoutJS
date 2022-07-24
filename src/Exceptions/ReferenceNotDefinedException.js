export class ReferenceNotDefinedException extends Error {
    constructor(value) {
        let message = `ReferenceError: ${value} is not defined.`;
        super(message);

        this.name = 'ReferenceNotDefinedException';
    }
}
