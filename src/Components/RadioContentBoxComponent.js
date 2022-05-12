import ReferenceNotDefinedException from '../Exceptions/ReferenceNotDefinedException.js'
import RadioSelectorField from './RadioSelectorField.js';
import BaseInputComponent from './BaseInputComponent.js';

export default class RadioContentBoxComponent extends BaseInputComponent{
    constructor(args){
        super();

        let selectors = {
            checked: '[type=radio]:checked',
            radioType: '[type=radio]',
        };

        let classes = {
            box: ['content-box'],
            row: ['content-box__row'],
        };

        let optionCount = 0;
        let fieldName = `checkout[attributes][${args.name}]`;
        let fieldId = `checkout_attributes_${args.name}`;
        let name = args.name;

        this.classList.add(classes.box);

        Object.setPrototypeOf(this, RadioContentBoxComponent.prototype);

        return Object.assign(this, {
            selectors,
            classes,
            fieldName,
            fieldId,
            name,
            optionCount,
        });
    }

    addOption(args){
        if(args.label == null) throw new ReferenceNotDefinedException('args.label');

        let row = document.createElement('row');
        row.classList.add(...this.classes.row);

        args.name = this.name;
        args.id = `${this.fieldId}_${++this.optionCount}`;

        let option = new RadioSelectorField(args);
        option.addEventListener('input', this.changed.bind(this));
        row.appendChild(option);

        this.appendChild(row);
        this.firstChild.querySelector(this.selectors.radioType).checked = true;
    }

    remove(){
        let event = new CustomEvent(`checkout:field:removed`, { detail: this });
        document.dispatchEvent(event);
        super.remove();
    }

    get value(){
        return this.querySelector(this.selectors.checked).value;
    }
}