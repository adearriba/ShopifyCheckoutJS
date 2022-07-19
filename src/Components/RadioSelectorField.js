import ReferenceNotDefinedException from '../Exceptions/ReferenceNotDefinedException.js'
import BaseInputComponent from './BaseInputComponent.js';

export default class RadioSelectorField extends BaseInputComponent
{
    /**
     * Creates a RadioSelectorField component
     * @param {string} args.id Html element ID
     * @param {string} args.name Field name
     * @param {string} args.value Radio selector value
     * @param {string?} args.label Plain text label
     * @param {string?} args.label Plain text label
     * @param {string?} args.innerHTML HTML label. (Only if no label is specified)
     * @returns {RadioSelectorField}
     * @throws {ReferenceNotDefinedException} For any missing mandatory parameter
     */
    constructor(args){
        super(args);

        let selectors = {
            input: 'input',
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
        if(args.label == null && args.innerHTML == null) throw new ReferenceNotDefinedException('args.label || args.innerHTML');

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

    get checked(){
        return this.querySelector(this.selectors.input).checked;
    }

    set checked(isChecked = true){
        this.querySelector(this.selectors.input).checked = isChecked;
        this.changed(new InputEvent('checked:changed'));
    }
}