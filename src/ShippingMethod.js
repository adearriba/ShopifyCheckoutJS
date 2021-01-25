export default class ShippingMethod extends HTMLDivElement{
    constructor(element){
        if(!(element instanceof HTMLDivElement)
            || !element.classList.contains('radio-wrapper')){
            throw TypeError('Not a radio-wrapper');
        }
        Object.setPrototypeOf(element, ShippingMethod.prototype);
        element.addEventListener('change', (e) => {
            let event = new CustomEvent(`checkout:shippingmethod:changed`, { detail: element });
            document.dispatchEvent(event);
        });

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

    get paymentMethodId(){
        let input = this.querySelector('input');
        if(!input) return Error('No input found for the payment method');
        return input.id;
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