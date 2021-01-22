import Field from './Field.js';

export default class TextField extends Field{
    constructor(args){
        super(args);
        Object.setPrototypeOf(this, TextField.prototype);

        if (typeof args == 'object'){
            this.addField(args);    
        }

        this.created();    
    }

    addField(args){
        let input = document.createElement('input');
        input.classList.add('field__input');
        input.placeholder = (args.placeholder) ? args.placeholder : '';
        input.size = (args.size) ? args.size : 30;
        input.type = (args.type) ? args.type : 'text';
        input.value = (args.defaultValue) ? args.defaultValue : '';

        input.name = this.fieldName;
        input.id = this.fieldId;
        
        this.querySelector(`.${this.wrapperClass}`).appendChild(input);

        if(typeof args.tooltip == 'string'){
            this.addTooltip(args.tooltip);
        }
    }

    addTooltip(text = '', icon = '#question'){
        this.removeTooltip();

        const wrapper = this.querySelector(`.${this.wrapperClass}`);
        wrapper.classList.add('field__input-wrapper--icon-right');

        let tooltipDiv = document.createElement('div');
        tooltipDiv.setAttribute('role', 'tooltip');
        tooltipDiv.classList.add('field__icon', 'has-tooltip');

        let tooltipSpan = document.createElement('span');
        tooltipSpan.id = `tooltip-for-${this.fieldId}`;
        tooltipSpan.classList.add('tooltip');
        tooltipSpan.innerText = text;

        let iconDiv = document.createElement('div');
        iconDiv.classList.add('field__icon-svg');

        let iconSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
        iconSVG.classList.add('icon-svg', 'icon-svg--color-adaptive-lighter','icon-svg--size-16', 'icon-svg--block');
        iconSVG.setAttribute('role', 'presentation');
        iconSVG.focusable = 'false';
        
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', icon);
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icon);
        
        iconSVG.appendChild(use);
        iconDiv.appendChild(iconSVG);
        tooltipDiv.appendChild(tooltipSpan);
        tooltipDiv.appendChild(iconDiv)

        wrapper.appendChild(tooltipDiv);
    }

    removeTooltip(){
        const wrapper = this.querySelector(`.${this.wrapperClass}`);
        const tooltips = wrapper.querySelectorAll('.field__icon');

        wrapper.classList.remove('field__input-wrapper--icon-right');
        tooltips.forEach(element => {
            element.remove();
        });
    }
}
