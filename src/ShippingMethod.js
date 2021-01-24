export default class ShippingMethod extends HTMLDivElement{
    constructor(element){
        if(!(element instanceof HTMLDivElement)
            || !element.classList.contains('radio-wrapper')){
            throw TypeError('Not a radio-wrapper');
        }
        Object.setPrototypeOf(element, ShippingMethod.prototype);
        return element;
    }

    addDescription(text){
        let span = this.querySelector('.radio__label__primary');
        let desc = document.createElement('span');
        desc.classList.add('small-text');
        desc.innerHTML = text;

        span.appendChild(document.createElement('br'));
        span.appendChild(desc);
    }

    get checked(){
        let input = this.querySelector('input');
        if(!input) return false;
        return input.checked;
    }

    set checked(boolean){
        let input = this.querySelector('input');
        if(!input || !(typeof boolean == 'boolean')) return;
        return input.checked = boolean;
    }
}