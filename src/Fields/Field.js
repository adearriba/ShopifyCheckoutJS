import NotValidFieldException from '../Exceptions/NotValidFieldException.js';
import NotImplementedError from '../Exceptions/NotImplementedError.js';

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
        let possibleWrapperClasses = [
            '.field__input-wrapper',
            '.checkbox-wrapper'
        ];
        
        possibleWrapperClasses.some( className => {
            let element = field.querySelector(className);
            if(element != null){
                field.wrapperClass = className;
                return true;
            }
        });
    }
}

export default class Field extends HTMLDivElement{
    constructor(args){
        let wrapperClass = '';

        if(typeof args == 'string'){       
            let input = document.querySelector(`#${args}`);
            let element = new FieldRetriever().retrieve(input);

            Object.setPrototypeOf(element, Field.prototype);
            if(element.type == 'checkbox') {
                    wrapperClass = 'checkbox-wrapper'; 
            } else { 
                wrapperClass = 'field__input-wrapper'; 
            }

            let field = Object.assign(element, {
                fieldName: element.name,
                fieldId: element.id,
                wrapperClass: wrapperClass,
                inputSelector: '[id^="checkout_"]',
            });

            return field;
        }else if (typeof args == 'object'){
            const { name, label = name } = args;
            let fieldId = `checkout_attributes_${args.name}`;
            let fieldName = `checkout[attributes][${args.name}]`;

            let element = document.createElement('div');
            element.classList.add('field');

            let wrapperElement = document.createElement('div');
            if(args.type == 'checkbox') {
                 wrapperClass = 'checkbox-wrapper'; 
            } else { 
                wrapperClass = 'field__input-wrapper'; 
            }

            wrapperElement.classList.add(wrapperClass);

            let labelElement = document.createElement('label');
            labelElement.classList.add('field__label', 'field__label--visible');
            labelElement.innerText = label;
            labelElement.htmlFor = fieldId;

            wrapperElement.appendChild(labelElement);
            element.appendChild(wrapperElement);

            Object.setPrototypeOf(element, Field.prototype);
            let field = Object.assign(element, {
                fieldName: fieldName,
                fieldId: fieldId,
                wrapperClass: wrapperClass,
                inputSelector: '[id^="checkout_"]',
            });
            
            return field;
        }
    }

    created(){
        let event = new CustomEvent(`checkout:field:created`, { detail: this });
        document.dispatchEvent(event);
    }

    addField(args){
        throw new NotImplementedError();
    }

    showError(message){
        this.removeError();
        this.classList.add('field--error');

        if(message && message.length > 0){
            let errorElement = document.createElement('p');
            errorElement.classList.add('field__message', 'field__message--error');
            errorElement.innerHTML = message;

            this.appendChild(errorElement);
        }
    }

    removeError(){
        this.classList.remove('field--error');

        let errorElements = this.querySelectorAll('.field__message--error');
        errorElements.forEach( (element) => {
            element.remove();
        });
    }

    remove(){
        let event = new CustomEvent(`checkout:field:removed`, { detail: this });
        document.dispatchEvent(event);
        super.remove();
    }

    get value(){
        return this.querySelector(this.inputSelector).value;
    }

    set value(val){
        let input = this.querySelector(this.inputSelector);
        input.value = val;
    }
}
