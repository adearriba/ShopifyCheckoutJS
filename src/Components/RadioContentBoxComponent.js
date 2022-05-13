import ReferenceNotDefinedException from '../Exceptions/ReferenceNotDefinedException.js'
import RadioSelectorField from './RadioSelectorField.js';
import BaseInputComponent from './BaseInputComponent.js';

export default class RadioContentBoxComponent extends BaseInputComponent{
    constructor(args){
        super();

        let selectors = {
            checked: '[type=radio]:checked',
            radioType: '[type=radio]',
            allOptions: '.content-box__row'
        };

        let classes = {
            box: ['content-box'],
            row: ['content-box__row'],
        };

        let optionCount = 0;
        let options = [];
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
            options,
        });
    }

    addOption(args){
        if(args.label == null) throw new ReferenceNotDefinedException('args.label');

        let row = document.createElement('row');
        row.classList.add(...this.classes.row);

        args.name = this.name;
        args.id = `${this.fieldId}_${++this.optionCount}`;

        let option = new RadioSelectorField(args);
        option.on('changed', this.changed.bind(this));
        this.options.push(option);
        row.appendChild(option);
        this.appendChild(row);
        
        if(this.optionCount == 1)
        {
            this.firstChild.querySelector(this.selectors.radioType).checked = true;
            option.changed.bind(this)(new InputEvent('FirstOptionSelected'));
        }
    }

    removeAllOptions(){
        let options = this.querySelectorAll(this.selectors.allOptions);
        options.forEach((element) => {
            element.remove();
        });
        this.options = [];
        this.optionCount = 0;
    }

    remove(){
        let event = new CustomEvent(`checkout:field:removed`, { detail: this });
        document.dispatchEvent(event);
        super.remove();
    }

    get value(){
        let input = this.querySelector(this.selectors.checked);
        return input ? input.value : null;
    }
}