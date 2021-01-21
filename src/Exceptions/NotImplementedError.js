export default class NotImplementedError extends Error {
    constructor(message) {
        const sender = (new Error)
            .stack
            .split('\n')[2]
            .replace(' at ', '')
            ;

        let error = `The method ${sender} isn't implemented.`;
        if (message) error += ` Message: "${message}".`;

        super(error);
    }
}