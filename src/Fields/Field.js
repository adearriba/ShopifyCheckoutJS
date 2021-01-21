import NotValidFieldException from '../Exceptions/NotValidFieldException.js';
import NotImplementedError from '../Exceptions/NotImplementedError.js';

export default class Field extends HTMLDivElement{
    constructor(args){
        if(typeof args == 'string'){       
            let input = document.querySelector(`#${args}`);
            let element = input.closest('.field');
            
            if(element == null) throw new NotValidFieldException();

            Object.setPrototypeOf(element, Field.prototype);
            return element;
        }else if (typeof args == 'object'){
            const { name, label = name } = args;
            let fieldId = `checkout_attributes_${args.name}`;
            let fieldName = `checkout[attributes][${args.name}]`;

            let element = document.createElement('div');
            element.classList.add('field');

            let wrapperElement = document.createElement('div');
            wrapperElement.classList.add('field__input-wrapper');

            let labelElement = document.createElement('label');
            labelElement.classList.add('field__label', 'field__label--visible');
            labelElement.innerText = label;
            labelElement.htmlFor = fieldId;

            wrapperElement.appendChild(labelElement);
            element.appendChild(wrapperElement);

            Object.setPrototypeOf(element, Field.prototype);
            return Object.assign(element, {
                fieldName: fieldName,
                fieldId: fieldId
            });
        }
    }

    addField(args){
        throw new NotImplementedError();
    }
}
