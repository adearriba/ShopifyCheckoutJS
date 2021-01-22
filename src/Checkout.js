import NotValidFieldException from './Exceptions/NotValidFieldException.js';
import Field from './Fields/Field.js';
import TextField from './Fields/TextField.js';
import CheckboxField from './Fields/CheckboxField.js';
import DropdownField from './Fields/DropdownField.js';

export default class Checkout {
    constructor(){
        this.Steps = {
            INFORMATION: 'contact_information',
            SHIPPING: 'shipping_method',
            PAYMENT: 'payment_method',
            PROCESSING: 'processing',
            THANKYOU: 'thank_you',
            ORDERSTATUS: 'order_status',
            STOCK_PROBLEMS: 'stock_problems',
        }

        document.addEventListener('page:load', this._onLoad.bind(this), false);
        document.addEventListener('page:change', this._onLoad.bind(this), false);
        document.addEventListener('checkout:field:created', this._fieldCreated.bind(this), false);
        document.addEventListener('checkout:field:removed', this._fieldRemoved.bind(this), false);

        this.lastStep = this._getLastStep();
        this.currentStep = this._getCurrentStep();
        this.fields = this._getFields();
    }

    _getFields(){
        let fields = [];

        const fieldNodes = document.querySelectorAll('input, select');
        fieldNodes.forEach(el => {
            if(typeof el.id !== 'string' || el.id.length == 0){
                return;
            }

            switch (el.type) {
                case 'text':
                    fields[el.id] = new TextField(el.id);
                    break;
                case 'email':
                    fields[el.id] = new TextField(el.id);
                    break;
                case 'tel':
                    fields[el.id] = new TextField(el.id);
                    break;
                case 'checkbox':
                    fields[el.id] = new CheckboxField(el.id);
                    break;
                case 'select-one':
                    fields[el.id] = new DropdownField(el.id);
                    break;
                case 'hidden':
                    break;
                default:
                    try{
                        fields[el.id] = new Field(el.id);
                    }catch(e){
                        if(e instanceof NotValidFieldException) return;
                        else throw e;
                    }
                    break;
            }
        });

        return fields;
    }

    _getLastStep(){
        let lastStep = sessionStorage.getItem('step');

        if(lastStep == null) {
            let url = new URL(document.referrer);
            lastStep = url.pathname;
        }

        return lastStep;
    }

    _getCurrentStep(){
        let step = Shopify.Checkout.step;
        if(Shopify.Checkout.page == 'stock_problems') { step = Steps.STOCK_PROBLEMS; }

        if(typeof Shopify.Checkout.OrderStatus != 'undefined'){
            if(Shopify.Checkout.page == 'thank_you') step = Steps.THANKYOU;
            else step = Steps.ORDERSTATUS;
        }

        sessionStorage.setItem('step', step);
        return step;
    }

    _triggerEvent(name, details = {}){
        let event = new CustomEvent(`checkout:${name}`, { detail: details });
        document.dispatchEvent(event);
    }

    _onLoad(event){
        try{
            this._triggerEvent('load');

            switch (this.currentStep) {
                case this.Steps.INFORMATION:
                    this._triggerEvent('load:information');
                    break;
                case this.Steps.SHIPPING:
                    this._triggerEvent('load:shipping');
                    break;
                case this.Steps.PAYMENT:
                    this._triggerEvent('load:payment');
                    break;
                case this.Steps.PROCESSING:
                    this._triggerEvent('load:processing');
                    break;
                case this.Steps.THANKYOU:
                    this._triggerEvent('load:thankyou');
                    break;
                case this.Steps.ORDERSTATUS:
                    this._triggerEvent('load:orderstatus');
                    break;
                case this.Steps.STOCK_PROBLEMS:
                    this._triggerEvent('load:stockproblems');
                    break;
                default:
                    break;
            }
        }catch(ex){
            this._triggerEvent('error', {
                step: this.currentStep,
                event: event,
                error: ex
            });
        }
    }

    _fieldCreated(event){        
        let field = event.detail;
        let input = field.querySelector(`[id^="checkout_"]`);

        if(this.fields && !this.fields.hasOwnProperty(input.id)){
            this.fields[input.id] = field;
        }
    }

    _fieldRemoved(event){
        let field = event.detail;
        let input = field.querySelector(`[id^="checkout_"]`);

        if(this.fields && this.fields.hasOwnProperty(input.id)){
            delete this.fields[input.id];
        }        
    }

    on(event, callback){
        document.addEventListener(`checkout:${event}`, callback, false);
    }
}