import Field from './Field.js';

export default class CheckboxField extends Field{
    constructor(args){
        super(args);
        Object.setPrototypeOf(this, CheckboxField.prototype);

        if (typeof args == 'undefined' || typeof args == 'boolean'){
            this.addField(args);
        }
    }

    addField(args){
        let wrapper = this.querySelector('.checkbox-wrapper');

        let label = wrapper.querySelector('label');
        label.classList.remove(...label.classList);
        label.classList.add('checkbox__label');

        let input = document.createElement('input');
        input.classList.add('input-checkbox');
        input.type = 'checkbox';
        input.checked = args;

        input.name = this.fieldName;
        input.id = this.fieldId;

        wrapper.insertBefore(input, label);
    }
}