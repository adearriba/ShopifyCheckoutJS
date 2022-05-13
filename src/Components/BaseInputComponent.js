import BaseComponent from './BaseComponent.js';

export default class BaseInputComponent extends BaseComponent{
    constructor(args = null)
    {
        super(args);
        Object.setPrototypeOf(this, BaseInputComponent.prototype);

        return this;
    }

    changed(innerEvent){
        let event = new CustomEvent(`checkout:${this.componentType}:changed`, { detail: 
            {
                event: innerEvent,
                value: this.value
            }
        });
        this.dispatchEvent(event);
    }

    on(event, callback){
        this.addEventListener(`checkout:${this.componentType}:${event}`, callback, false);
    }

    onValueChanged(callback){
        this.on(`changed`, callback);
    }
}