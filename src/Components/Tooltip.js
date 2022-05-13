export default class Tooltip extends HTMLDivElement{
    constructor(text, fieldId, icon = '#question'){
        let classes = {
            wrapper: ['field__icon'],
            container: ['tooltip-container'],
            tooltip: ['tooltip'],
            button: ['tooltip-control'],
            svgIcon: ['icon-svg', 'icon-svg--color-adaptive-lighter','icon-svg--size-16', 'icon-svg--block', 'icon-svg--center'],
        };

        let tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add(...classes.wrapper);

        let tooltipContainer = document.createElement('div');
        tooltipContainer.classList.add(...classes.container);

        let tooltipSpan = document.createElement('span');
        tooltipSpan.id = `tooltip-for-${fieldId}`;
        tooltipSpan.classList.add(...classes.tooltip);
        tooltipSpan.innerText = text;

        let button = document.createElement('button');
        button.classList.add(...classes.button);
        button.type = 'button';
        
        let iconSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
        iconSVG.classList.add(...classes.svgIcon);
        iconSVG.setAttribute('role', 'presentation');
        iconSVG.focusable = 'false';
        
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', icon);
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icon);
        
        iconSVG.appendChild(use);
        button.appendChild(iconSVG);
        tooltipContainer.appendChild(button);
        tooltipContainer.appendChild(tooltipSpan);
        tooltipDiv.appendChild(tooltipContainer);

        return tooltipDiv;
    }
}