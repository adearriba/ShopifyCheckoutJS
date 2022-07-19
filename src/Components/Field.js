/* eslint-disable constructor-super */
import NotValidFieldException from '../Exceptions/NotValidFieldException.js';
import NotImplementedError from '../Exceptions/NotImplementedError.js';
import BaseInputComponent from './BaseInputComponent.js';

class FieldRetriever {
    retrieve(inputElement){
        let possibleParentsClasses = [
            '.field',
            '.checkbox-wrapper'
        ];

        let element = null;
        let found = possibleParentsClasses.some( className => {
            element = inputElement.closest(className);
            if(element != null) return true;
        });

        if(found){ 
            let field = {};
            if(!element.classList.contains('field')) {
                field = document.createElement('div');
                let parent = element.parentElement;

                field.classList.add('field');
                field.appendChild(element);
                parent.appendChild(field);
            }else {
                field = element;
            }
            this._setFieldPropierties(field);
            return field;
        }
        else throw new NotValidFieldException();
    }

    _setFieldPropierties(field){
        if(!field.children) return;
        field.wrapperClass = field.children[0].classList[0];
    }
}

export default class Field extends BaseInputComponent{
    constructor(args){
        super({ type: 'field' });

        let selectors = {
            input: '[id^="checkout_"]',
            errorMessage: '.field__message--error',
            wrapper: '.field__input-wrapper',
        };

        let classes = {
            wrapper: ['field__input-wrapper'],
            field: ['field', 'field--show-floating-label'],
            fieldInput: ['field__input'],
            label: ['field__label', 'field__label--visible'],
            fieldError: ['field--error'],
            fieldErrorMessage: ['field__message', 'field__message--error'],
            half: ['field--half'],
        };

        if(typeof args == 'string'){       
            let input = document.querySelector(`#${args}`);
            let element = new FieldRetriever().retrieve(input);
            Object.setPrototypeOf(element, Field.prototype);

            let field = Object.assign(element, {
                componentType: this.componentType,
                fieldName: element.name,
                fieldId: element.id,
                selectors,
                classes,
            });

            return field;
        }else if (typeof args == 'object'){
            const { name, label = name, isHalf } = args;

            let fieldId = `checkout_attributes_${name}`;
            let fieldName = `checkout[attributes][${name}]`;

            let element = this;
            element.classList.add(...classes.field);
            if(isHalf) element.classList.add(classes.half);

            let wrapperElement = document.createElement('div');
            wrapperElement.classList.add(classes.wrapper);

            let labelElement = document.createElement('label');
            labelElement.classList.add(...classes.label);
            labelElement.innerText = label;
            labelElement.htmlFor = fieldId;

            wrapperElement.appendChild(labelElement);
            element.appendChild(wrapperElement);

            Object.setPrototypeOf(element, Field.prototype);
            let field = Object.assign(element, {
                fieldName: fieldName,
                fieldId: fieldId,
                selectors,
                classes,
            });
            
            return field;
        }
    }

    created(){
        this.addEventListener("input", this.changed);

        let event = new CustomEvent(`checkout:${this.componentType}:created`, { detail: this });
        document.dispatchEvent(event);
    }

    changed(innerEvent){
        let input = this.querySelector(this.selectors.input);
        let event = new CustomEvent(`checkout:${this.componentType}:changed`, { detail: 
            {
                event: innerEvent,
                input: input,
                value: input.value
            }
        });
        this.dispatchEvent(event);
    }

    // eslint-disable-next-line no-unused-vars
    addField(args){
        throw new NotImplementedError();
    }

    /**
     * Displays an error message for the field.
     * @param {string} message Error message to display
     */
    showError(message){
        this.removeError();
        this.classList.add(...this.classes.fieldError);

        if(message && message.length > 0){
            let errorElement = document.createElement('p');
            errorElement.classList.add(...this.classes.fieldErrorMessage);
            errorElement.innerHTML = message;

            this.appendChild(errorElement);
        }
    }

    /**
     * Removes the errores for the field.
     */
    removeError(){
        this.classList.remove(...this.classes.fieldError);

        let errorElements = this.querySelectorAll(this.selectors.errorMessage);
        errorElements.forEach( (element) => {
            element.remove();
        });
    }

    /**
     * Removes the field from the page and fires the 'removed' event.
     */
    remove(){
        let event = new CustomEvent(`checkout:${this.componentType}:removed`, { detail: this });
        document.dispatchEvent(event);
        super.remove();
    }

    get value(){
        return this.querySelector(this.selectors.input).value;
    }

    set value(val){
        let input = this.querySelector(this.selectors.input);
        input.value = val;
        this.changed(new InputEvent('input:changed'));
    }
}
