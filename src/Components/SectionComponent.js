import BaseComponent from './BaseComponent.js';

export default class SectionComponent extends BaseComponent{
    constructor(args = null)
    {
        super(args);
        Object.setPrototypeOf(this, SectionComponent.prototype);

        return this;
    }

    
}