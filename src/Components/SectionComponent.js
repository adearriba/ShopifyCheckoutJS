import BaseComponent from './BaseComponent.js';

export default class SectionComponent extends BaseComponent{
    constructor(args = null)
    {
        super(args);
        const {title, name} = args;

        let selectors = {
            contentDivs: '.section__content',
        };

        let classes = {
            section: ['section', `section--${name}`],
            header: ['section__header'],
            content: ['section__content'],
            title: ['section__title'],
        };

        this.classList.add(...classes.section);
        let headerDiv = document.createElement('div');
        headerDiv.classList.add(...classes.header);

        let h2 = document.createElement('h2');
        h2.classList.add(...classes.title);
        h2.textContent = title;

        headerDiv.appendChild(h2);

        let contentDiv = document.createElement('div');
        contentDiv.classList.add(...classes.content);

        this.appendChild(headerDiv);
        this.appendChild(contentDiv);

        Object.setPrototypeOf(this, SectionComponent.prototype);

        return Object.assign(this, {
            selectors,
            classes,
        });
    }

    addContent(component)
    {
        if(!component || !(component instanceof BaseComponent)) throw TypeError('Object trying to add is not a component.');
        this.querySelector(this.selectors.contentDivs).appendChild(component);
    }

}