import TextField from './Fields/TextField.js';

export default class Checkout {
    constructor(){
        this.lastStep = this._getLastStep();
        this.currentStep = this._getCurrentStep();
        this.fields = this._getFields();
        
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

        this.on('load:information', (ev) => {
            console.log(ev);
        });
    }

    _getFields(){
        let fields = [];

        $('input').each( (_k, v) => {
            if(typeof v.id !== 'string' || v.id.length == 0){
                return true;
            }

            switch (v.type) {
                case 'text':
                    fields.push(new TextField(v.id));
                    break;
                default:
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

    on(event, callback){
        document.addEventListener(`checkout:${event}`, callback, false);
    }
}