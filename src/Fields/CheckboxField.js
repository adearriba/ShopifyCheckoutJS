import Field from './Field.js';

export default class CheckboxField extends Field{
    constructor(args){
        let selectors = {
            input: 'input[type="checkbox"]',
            wrapper: '.checkbox-wrapper',
        };

        let classes = {
            label: ['checkbox__label'],
            fieldInputWrapper: ['checkbox__input'],
            fieldInput: ['input-checkbox'],
            wrapper: ['checkbox-wrapper'],
        };

        if (typeof args == 'object'){
            args.type = 'checkbox';

            super(args);
            let wrapper = this.querySelector(this.selectors.wrapper)
            wrapper.classList.remove(...wrapper.classList);
            wrapper.classList.add(...classes.wrapper);

            Object.setPrototypeOf(this, CheckboxField.prototype);
            Object.assign(this.classes, classes);
            Object.assign(this.selectors, selectors);

            let checked = (typeof args.checked == 'boolean') ? args.checked : false;
            this.addField(checked);
        }else{
            super(args);
            Object.setPrototypeOf(this, CheckboxField.prototype);
            Object.assign(this.classes, classes);
            Object.assign(this.selectors, selectors);
        }
        
        this.created();
    }

    addField(checked){
        let wrapper = this.querySelector(this.selectors.wrapper);

        let label = wrapper.querySelector('label');
        label.classList.remove(...label.classList);
        label.classList.add(...this.classes.label);

        let div = document.createElement('div');
        div.classList.add(...this.classes.fieldInputWrapper);

        let input = document.createElement('input');
        input.classList.add(...this.classes.fieldInput);
        input.type = 'checkbox';
        input.checked = checked;

        input.name = this.fieldName;
        input.id = this.fieldId;

        div.appendChild(input);
        wrapper.insertBefore(div, label);
    }

    get checked(){
        let checkbox = this.querySelector(this.selectors.input);
        return checkbox.checked;
    }

    set checked(checked){
        let checkbox = this.querySelector(this.selectors.input);
        checkbox.checked = checked;
    }
}