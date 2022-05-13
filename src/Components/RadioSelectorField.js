import ReferenceNotDefinedException from '../Exceptions/ReferenceNotDefinedException.js'
import BaseInputComponent from './BaseInputComponent.js';

export default class RadioSelectorField extends BaseInputComponent
{
    constructor(args){
        super(args);

        let selectors = {

        };

        let classes = {
            wrapper: ['radio-wrapper'],
            input: ['radio__input'],
            radioInput: ['input-radio'],
            radioLabel: ['radio__label']
        };
        
        if(args.name == null) throw new ReferenceNotDefinedException('args.name');
        if(args.value == null) throw new ReferenceNotDefinedException('args.value');
        if(args.id == null) throw new ReferenceNotDefinedException('args.id');
        if(args.label == null) throw new ReferenceNotDefinedException('args.label');

        let radioId = args.id;
        let value = args.value;
        let fieldName = `checkout[attributes][${args.name}]`;
        let fieldId = `checkout_attributes_${args.name}`;

        this.classList.add(classes.wrapper);

        Object.setPrototypeOf(this, RadioSelectorField.prototype);

        let field = Object.assign(this, {
            selectors,
            classes,
            fieldName,
            fieldId,
            value,
            radioId,
        });

        if (typeof args == 'object'){
            field.addField(args)
        }

        return field;
    }

    addField(args){
        let inputDiv = this._createInput(args.id);
        let labelDiv = this._createLabel(args);
    
        this.appendChild(inputDiv);
        this.appendChild(labelDiv);
    }

    _createInput(id)
    {
        let inputDiv = document.createElement('div');
        inputDiv.classList.add(...this.classes.input);

        let input = document.createElement('input');
        input.classList.add(...this.classes.radioInput);
        input.type = 'radio';
        input.value = this.value;
        input.name = this.fieldName;
        input.id = id;
        input.addEventListener("input", this.changed.bind(this));

        inputDiv.appendChild(input);
        return inputDiv;
    }

    _createLabel(args)
    {
        const {label, id, innerHTML} = args;

        let labelDiv = document.createElement('label');
        labelDiv.classList.add(...this.classes.radioLabel);
        labelDiv.htmlFor = id;

        let span = document.createElement('span');
        span.textContent = label;
        if(innerHTML != null) span.innerHTML = innerHTML;

        labelDiv.appendChild(span);
        return labelDiv;
    }
}