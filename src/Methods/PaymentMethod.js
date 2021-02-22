import NotValidFieldException from "../Exceptions/NotValidFieldException";
import SelectionMethod from "./SelectionMethod";

export default class PaymentMethod extends SelectionMethod{
    constructor(element){
        if(!element.dataset.selectGateway) 
            throw new NotValidFieldException();

        super(element);
        Object.setPrototypeOf(this, PaymentMethod.prototype);

        this.type = 'payment';
        this.addEventListener('change', () => {
            let event = new CustomEvent(`checkout:paymentmethod:changed`, { detail: this });
            document.dispatchEvent(event);
        });
    }

    addDescription(text){
        let desc = this.nextElementSibling.querySelector('.blank-slate');
        desc.innerHTML = text;
    }

    get methodData(){
        return this.dataset;
    }

    get gatewayId(){
        return this.dataset.selectGateway;
    }

    get gatewayName(){
        return this.dataset.gatewayName;
    }
}