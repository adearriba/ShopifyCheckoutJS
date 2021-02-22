import SelectionMethod from "./SelectionMethod";

export default class ShippingMethod extends SelectionMethod{
    constructor(element){
        super(element);
        Object.setPrototypeOf(this, ShippingMethod.prototype);

        this.type = 'shipping';
        this.addEventListener('change', () => {
            let event = new CustomEvent(`checkout:shippingmethod:changed`, { detail: this });
            document.dispatchEvent(event);
        });
    }

    addDescription(text){
        let span = this.querySelector('.radio__label__primary');
        let desc = document.createElement('span');
        desc.classList.add('small-text');
        desc.innerHTML = text;

        span.appendChild(document.createElement('br'));
        span.appendChild(desc);
    }

    get shippingRate(){
        return this.methodData.checkoutTotalShippingCents/100;
    }

    get subtotalPrice(){
        return this.methodData.checkoutSubtotalPriceCents/100;
    }
}