export default class NotValidFieldException extends Error {
    constructor(value) {
        let message = `${value} does not have a valid Shopify field element as parent.`;
        super(message);

        this.name = 'NotValidFieldException';
    }
}
