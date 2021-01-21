export default class Field {
    constructor(args){
        if(typeof args == 'string'){
            this.createFromSelector(args);
        }else if (typeof args == 'object'){
            this.create(args);
        }
    }

    create({ type, name, label = name }){
        this.type = type;
        this.label = label;
        this.name = `checkout[attributes][${name}]`;
        this.id = `checkout_attributes_${name}`;

        this.element = document.createElement('div');
        this.element.classList.add('field');

        let wrapperElement = document.createElement('div');
        wrapperElement.classList.add('field__input-wrapper');

        let labelElement = document.createElement('label');
        labelElement.classList.add('field__label', 'field__label--visible');
        labelElement.innerText = this.label;
        labelElement.htmlFor = this.id;

        wrapperElement.appendChild(labelElement);
        this.element.appendChild(wrapperElement);
    }

    createFromSelector(id){
        const input = document.querySelector(`#${id}`);
        this.element = input.parentElement.parentElement;
        const label = this.element.querySelector('label');

        this.id = id;
        this.type = input.type;
        this.name = input.name;
        this.label = (label) ? label.innerText : '';
    }
}
