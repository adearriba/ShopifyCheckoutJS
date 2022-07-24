import {BaseComponent} from './BaseComponent.js';

export class BaseInputComponent extends BaseComponent{
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

    /**
     * Add an event listener to a specific event
     * @param {string} event Event name 
     * @param {function} callback Callback function to execute when event triggers
     */
    on(event, callback){
        this.addEventListener(`checkout:${this.componentType}:${event}`, callback, false);
    }

    /**
     * Call a callback when the value of the component changes.
     * @param {function} callback Callback function to execute when the component changes
     */
    onValueChanged(callback){
        this.on(`changed`, callback);
    }
}