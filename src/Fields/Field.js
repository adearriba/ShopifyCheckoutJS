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
            if(!element.classList.contains('field')) {
                let field = document.createElement('div');
                let parent = element.parentElement;

                field.classList.add('field');
                field.appendChild(element);
                parent.appendChild(field);
                
                return field;
            }else{
                return element;
            }
        }
        else throw new NotValidFieldException();
    }
}

export default class Field extends HTMLDivElement{
    constructor(args){
        if(typeof args == 'string'){       
            let input = document.querySelector(`#${args}`);
            let element = new FieldRetriever().retrieve(input);

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
