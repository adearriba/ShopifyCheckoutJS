import Field from './Field.js';

export default class TextField extends Field{
    create({ type = 'text', name, label = name, placeholder = '', size = 30, defaultValue = '', tooltip }){
        super.create({ type: type, name: name, label: label });
        this.placeholder = placeholder;
        this.size = size;
        this.defaultValue = defaultValue;

        const wrapper = this.element.querySelector('.field__input-wrapper');
        this.addFieldTo(wrapper);

        if(typeof tooltip == 'string'){
            this.addTooltip({ text: tooltip });
        }
    }

    createFromSelector(id){
        super.createFromSelector(id);
        const input = this.element.querySelector(`#${id}`);

        this.placeholder = input.placeholder;
        this.size = input.size;
        this.defaultValue = input.value;
    }


    addFieldTo(element){
        let input = document.createElement('input');
        input.classList.add('field__input');
        input.placeholder = this.placeholder;
        input.size = this.size;
        input.type = 'text';
        input.value = this.defaultValue;
        input.name = this.name;
        input.id = this.id;

        element.appendChild(input);
    }

    addTooltip({ text = '', icon = '#question' }){
        this.removeTooltip();
        const wrapper = this.element.querySelector('.field__input-wrapper');
        wrapper.classList.add('field__input-wrapper--icon-right');

        let tooltipDiv = document.createElement('div');
        tooltipDiv.setAttribute('role', 'tooltip');
        tooltipDiv.classList.add('field__icon', 'has-tooltip');

        let tooltipSpan = document.createElement('span');
        tooltipSpan.id = `tooltip-for-${this.name}`;
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

        return this;
    }

    removeTooltip(){
        const wrapper = this.element.querySelector('.field__input-wrapper');
        const tooltips = wrapper.querySelectorAll('.field__icon');

        wrapper.classList.remove('field__input-wrapper--icon-right');
        tooltips.forEach(element => {
            element.remove();
        });
    }
}
