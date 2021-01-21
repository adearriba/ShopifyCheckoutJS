import Field from './Field.js';

export default class CheckboxField extends Field{
    constructor(args){
        if (typeof args == 'object'){
            args.type = 'checkbox';

            super(args);
            Object.setPrototypeOf(this, CheckboxField.prototype);

            let checked = (typeof args.checked == 'boolean') ? args.checked : false;
            this.addField(checked);
        }else{
            super(args);
            Object.setPrototypeOf(this, CheckboxField.prototype);
        }
    }

    addField(checked){
        let wrapper = this.querySelector('.checkbox-wrapper');

        let label = wrapper.querySelector('label');
        label.classList.remove(...label.classList);
        label.classList.add('checkbox__label');

        let div = document.createElement('div');
        div.classList.add('checkbox__input');

        let input = document.createElement('input');
        input.classList.add('input-checkbox');
        input.type = 'checkbox';
        input.checked = checked;

        input.name = this.fieldName;
        input.id = this.fieldId;

        div.appendChild(input);
        wrapper.insertBefore(div, label);
    }

    get checked(){
        let checkbox = this.querySelector('input[type="checkbox"]');
        return checkbox.checked;
    }
}