const Steps = {
    INFORMATION: 'contact_information',
    SHIPPING: 'shipping_method',
    PAYMENT: 'payment_method',
    PROCESSING: 'processing',
    THANKYOU: 'thank_you',
    ORDERSTATUS: 'order_status',
    STOCK_PROBLEMS: 'stock_problems',
}

function CheckoutManager() {
    this.lastStep = '';
    this.actualStep = '';
    
    this._init();

    document.addEventListener('page:load', this._onLoad.bind(this), false);
    document.addEventListener('page:change', this._onLoad.bind(this), false);

    this._registerFields();
};

CheckoutManager.prototype = Object.assign({}, CheckoutManager.prototype, {
    _init: function(){
        this.lastStep = sessionStorage.getItem('step');

        if(this.lastStep == null) {
            let url = new URL(document.referrer);
            this.lastStep = url.pathname;
        }

        let step = Shopify.Checkout.step;
        if(Shopify.Checkout.page == 'stock_problems') { step = Steps.STOCK_PROBLEMS; }

        if(typeof Shopify.Checkout.OrderStatus != 'undefined'){
            if(Shopify.Checkout.page == 'thank_you') step = Steps.THANKYOU;
            else step = Steps.ORDERSTATUS;
        }

        this.actualStep = step;
        sessionStorage.setItem('step', step);
    },
    _registerFields(){
        const fields = document.querySelectorAll('.field');
        fields.forEach((it) => {
            console.log(it);
        });
    },
    _onLoad: function(event){
        try{
            switch (this.actualStep) {
                case Steps.INFORMATION:
                    this._triggerEvent('load:information');
                    break;
                case Steps.SHIPPING:
                    this._triggerEvent('load:shipping');
                    break;
                case Steps.PAYMENT:
                    this._triggerEvent('load:payment');
                    break;
                case Steps.PROCESSING:
                    this._triggerEvent('load:processing');
                    break;
                case Steps.THANKYOU:
                    this._triggerEvent('load:thankyou');
                    break;
                case Steps.ORDERSTATUS:
                    this._triggerEvent('load:orderstatus');
                    break;
                case Steps.STOCK_PROBLEMS:
                    this._triggerEvent('load:stockproblems');
                    break;
                default:
                    break;
            }
        }catch(ex){
            this._triggerEvent('error', {
                step: this.getActualStep,
                event: event,
                error: ex
            });
        }
    },
    _triggerEvent: function(name, details = {}){
        let event = new CustomEvent(`checkout:${name}`, { detail: details });
        document.dispatchEvent(event);
    }
});

export { CheckoutManager, Steps };
