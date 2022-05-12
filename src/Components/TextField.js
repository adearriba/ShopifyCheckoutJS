import Field from './Field.js';
import Tooltip from './Tooltip.js';

export default class TextField extends Field{
    constructor(args){
        super(args);
        Object.setPrototypeOf(this, TextField.prototype);

        if (typeof args == 'object'){
            this.addField(args);    
        }

        this.created();    
    }

    addField(args){
        let input = document.createElement('input');
        input.classList.add(...this.classes.fieldInput);
        input.placeholder = (args.placeholder) ? args.placeholder : '';
        input.size = (args.size) ? args.size : 30;
        input.type = (args.type) ? args.type : 'text';
        input.value = (args.defaultValue) ? args.defaultValue : '';

        input.name = this.fieldName;
        input.id = this.fieldId;
        
        this.querySelector(this.selectors.wrapper).appendChild(input);

        if(typeof args.tooltip == 'string'){
            this.addTooltip(args.tooltip);
        }
    }

    addTooltip(text = '', icon = '#question'){
        this.removeTooltip();

        const wrapper = this.querySelector(this.selectors.wrapper);
        wrapper.classList.add('field__input-wrapper--icon-right');

        let tooltip = new Tooltip(text, this.fieldId, icon);
        wrapper.appendChild(tooltip);
    }

    removeTooltip(){
        const wrapper = this.querySelector(this.selectors.wrapper);
        const tooltips = wrapper.querySelectorAll('.field__icon');

        wrapper.classList.remove('field__input-wrapper--icon-right');
        tooltips.forEach(element => {
            element.remove();
        });
    }
}
