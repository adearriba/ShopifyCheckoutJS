export default class Tooltip extends HTMLDivElement{
    constructor(text, fieldId, icon = '#question'){
        let classes = {
            wrapper: ['field__icon', 'has-tooltip'],
            tooltip: ['tooltip'],
            svgWrapper: ['field__icon-svg'],
            svgIcon: ['icon-svg', 'icon-svg--color-adaptive-lighter','icon-svg--size-16', 'icon-svg--block'],
        };

        let tooltipDiv = document.createElement('div');
        tooltipDiv.setAttribute('role', 'tooltip');
        tooltipDiv.classList.add(...classes.wrapper);

        let tooltipSpan = document.createElement('span');
        tooltipSpan.id = `tooltip-for-${fieldId}`;
        tooltipSpan.classList.add(...classes.tooltip);
        tooltipSpan.innerText = text;

        let iconDiv = document.createElement('div');
        iconDiv.classList.add(...classes.svgWrapper);

        let iconSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
        iconSVG.classList.add(...classes.svgIcon);
        iconSVG.setAttribute('role', 'presentation');
        iconSVG.focusable = 'false';
        
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', icon);
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icon);
        
        iconSVG.appendChild(use);
        iconDiv.appendChild(iconSVG);
        tooltipDiv.appendChild(tooltipSpan);
        tooltipDiv.appendChild(iconDiv)

        return tooltipDiv;
    }
}