import Field from './Field.js';

export default class DropdownField extends Field{
    constructor(args){
        super(args);
        Object.setPrototypeOf(this, DropdownField.prototype);

        if (typeof args == 'object'){
            this.addField(args);
        }
    }

    addField(args){
        if(!args.options) throw new ReferenceError('No options defined for DropdownField');

        this.classList.add('field--show-floating-label');
        const wrapper = this.querySelector(`.${this.wrapperClass}`);
        wrapper.classList.add('field__input-wrapper--select');

        let input = document.createElement('select');
        input.classList.add('field__input', 'field__input--select');
        input.placeholder = (args.placeholder) ? args.placeholder : '';
        input.name = this.fieldName;
        input.id = this.fieldId;

        if(args.defaultValue){
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = args.defaultValue;
            
            input.add(defaultOption);
            input.placeholder = (args.placeholder) ? args.placeholder : args.defaultValue;
        }

        args.options.forEach(option => {
            let o = document.createElement("option");
            o.innerText = option.text;
            o.value = option.value;
            input.add(o);
        });

        let arrow = document.createElement('div');
        arrow.classList.add('field__caret', 'shown-if-js');
        
        let iconSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
        iconSVG.classList.add('icon-svg', 'icon-svg--color-adaptive-lighter','icon-svg--size-10', 'field__caret-svg');
        iconSVG.setAttribute('role', 'presentation');
        iconSVG.focusable = 'false';
        
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#caret-down');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#caret-down');
        
        iconSVG.appendChild(use);
        arrow.appendChild(iconSVG);
        
        wrapper.appendChild(input);
        wrapper.appendChild(arrow);
    }
}