import NotImplementedError from '../Exceptions/NotImplementedError.js';

export default class SelectionMethod extends HTMLDivElement{

    constructor(element){
        if(!(element instanceof HTMLDivElement)
            || !element.classList.contains('radio-wrapper')){
            throw TypeError('Not a radio-wrapper');
        }

        Object.setPrototypeOf(element, SelectionMethod.prototype);
        return Object.assign(element, {
            type: 'generic'
        });
    }

    addDescription(text){
        throw new NotImplementedError();
    }

    get input(){
        let input = this.querySelector('input');
        if(!input) return Error(`No input found for the ${this.type} method`);
        return input;
    }

    get methodData(){
        return this.input.dataset;
    }

    get methodId(){
        return this.input.id;
    }

    get checked(){
        return this.input.checked;
    }

    set checked(boolean){
        return this.input.checked = boolean;
    }
}