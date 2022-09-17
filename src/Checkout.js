/* eslint-disable no-undef */
import {NotValidFieldException} from './Exceptions/NotValidFieldException.js';
import {ShippingMethod} from './Methods/ShippingMethod.js';
import {PaymentMethod} from './Methods/PaymentMethod.js';
import {FieldFactory} from './Components/FieldFactory.js';

export class Checkout {
    constructor(){
        this.fields = [];

        this.Steps = {
            INFORMATION: 'contact_information',
            SHIPPING: 'shipping_method',
            PAYMENT: 'payment_method',
            PROCESSING: 'processing',
            THANKYOU: 'thank_you',
            ORDERSTATUS: 'order_status',
            STOCK_PROBLEMS: 'stock_problems',
        };

        this.selectors ={
            inputs: 'input[id], select[id]',
            selectionMethods: '.section--{TYPE}-method .radio-wrapper',
            fields: '[id^="checkout_"]',
            stockProblem: {
                list: '.stock-problem-table .product__description',
                name: '.product__description__name',
                description: '.product__description__variant',
            },
        };

        this.lastStep = this._getLastStep();
        this.currentStep = this._getCurrentStep();

        document.addEventListener('page:load', this._onLoad.bind(this), false);
        document.addEventListener('page:change', this._onLoad.bind(this), false);
        document.addEventListener('checkout:field:created', this._fieldCreated.bind(this), false);
        document.addEventListener('checkout:field:removed', this._fieldRemoved.bind(this), false);

        let form = document.querySelector('[type=submit]').parentElement.closest("form");
        form.addEventListener('submit', this._onContinue.bind(this), true);

        this.fields = this._getFields();
    }

    _getFields(){
        let fields = [];

        const fieldNodes = document.querySelectorAll(this.selectors.inputs);
        const fieldFactory = new FieldFactory();
        fieldNodes.forEach(el => {
            let field = fieldFactory.createFieldByElement(el);
            if (field != null) fields[el.id] = field;
        });

        return fields;
    }

    _getLastStep(){
        let lastStep = sessionStorage.getItem('step');

        if(lastStep == null && document.referrer && document.referrer.length > 2) {
            let url = new URL(document.referrer);
            lastStep = url.pathname;
        }

        return lastStep;
    }

    _getCurrentStep(){
        let step = Shopify.Checkout.step;
        if(Shopify.Checkout.page == 'stock_problems') { step = this.Steps.STOCK_PROBLEMS; }

        if(typeof Shopify.Checkout.OrderStatus != 'undefined'){
            if(Shopify.Checkout.page == 'thank_you') step = this.Steps.THANKYOU;
            else step = this.Steps.ORDERSTATUS;
        }

        sessionStorage.setItem('step', step);
        return step;
    }

    _triggerEvent(name, details = {}){
        let event = new CustomEvent(`checkout:${name}`, { detail: details });
        document.dispatchEvent(event);
    }

    _getSelectionMethods(type){
        let methods = document.querySelectorAll(this.selectors.selectionMethods.replace('{TYPE}',type));
        let methodsList = [];

        
        methods.forEach((method) => {
            try{
                if(type == 'shipping') {
                    methodsList.push(new ShippingMethod(method));
                } else if(type == 'payment') {
                    methodsList.push(new PaymentMethod(method));
                }
            }catch(ex){
                if (!(ex instanceof NotValidFieldException)) {
                    throw ex;
                }
            }
        });

        return methodsList;
    }

    _getStockProblemList(){
        let list = document.querySelectorAll(this.selectors.stockProblem.list);
        let stockProblemList = [];

        for (let item of list) {
            let name = item.querySelector(this.selectors.stockProblem.name).innerText;
            let variant = item.querySelector(this.selectors.stockProblem.description).innerText;
            stockProblemList.push({
                name: name,
                variant: variant,
            });
        }

        return stockProblemList;
    }

    _onContinue(event){
        this._triggerEvent('continue', { innerEvent: event });
    }

    _onLoad(event){
        try{
            this._triggerEvent('load');

            switch (this.currentStep) {
                case this.Steps.INFORMATION:
                    this._triggerEvent('load:information');
                    break;
                case this.Steps.SHIPPING: {
                    let shippingMethods = this._getSelectionMethods('shipping');
                    this._triggerEvent('load:shipping', { shippingMethods });
                    break;
                }
                case this.Steps.PAYMENT: {
                    let paymentMethods = this._getSelectionMethods('payment');
                    this._triggerEvent('load:payment', { paymentMethods });
                    break;
                }
                case this.Steps.PROCESSING:
                    this._triggerEvent('load:processing');
                    break;
                case this.Steps.THANKYOU:
                    this._triggerEvent('load:thankyou');
                    break;
                case this.Steps.ORDERSTATUS:
                    this._triggerEvent('load:orderstatus');
                    break;
                case this.Steps.STOCK_PROBLEMS: {
                    var stockProblemList = this._getStockProblemList();
                    this._triggerEvent('load:stockproblems', { stockProblemList });
                    break;
                }
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
        let input = field.querySelector(this.selectors.fields);

        if(input!=null)
        {
            let hasInputAlready = Object.prototype.hasOwnProperty.call(this.fields, input.id);

            if(this.fields && !hasInputAlready){
                this.fields[input.id] = field;
            }
        }
    }

    _fieldRemoved(event){
        let field = event.detail;
        let input = field.querySelector(this.selectors.fields);
        let hasInputAlready = Object.prototype.hasOwnProperty.call(this.fields, input.id);

        if(this.fields && hasInputAlready){
            delete this.fields[input.id];
        }        
    }

    /**
     * Add an event listener for a specific `event`
     * @param {string} event Event name to listen
     * @param {function} callback Callback function to call when event triggers
     */
    on(event, callback){
        document.addEventListener(`checkout:${event}`, callback, false);
    }
}
