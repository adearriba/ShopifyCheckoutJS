import {BaseComponent} from './BaseComponent.js';

export class SectionComponent extends BaseComponent{
    /**
     * Creates a new Section component if passed {title} and {name}.
     * Creates a Section component from an existing Section if passed a CSS selector as {selector} param.
     * @public
     * @param {{title: string, name: string, selector: string }} args 
     * @returns SectionComponent
     */
    constructor(args = null)
    {
        super(args);
        const {title, name, selector } = args;

        let selectors = {
            contentDivs: '.section__content',
        };

        let classes = {
            section: ['section', `section--${name}`],
            header: ['section__header'],
            content: ['section__content'],
            title: ['section__title'],
        };

        let isVisible = true;
        let contentDivs = [];

        if(selector!=null)
        { 
            let section = document.querySelector(selector);
            if(section!=null)
            {
                let contentDiv = section.querySelector(selectors.contentDivs);
                contentDivs.push(contentDiv);

                Object.setPrototypeOf(section, SectionComponent.prototype);

                return Object.assign(section, {
                    selectors,
                    classes,
                    isVisible,
                    contentDivs,
                });
            }
        }

        this.classList.add(...classes.section);
        let headerDiv = document.createElement('div');
        headerDiv.classList.add(...classes.header);

        let h2 = document.createElement('h2');
        h2.classList.add(...classes.title);
        h2.textContent = title;

        headerDiv.appendChild(h2);

        let contentDiv = document.createElement('div');
        contentDiv.classList.add(...classes.content);
        contentDivs.push(contentDiv);

        this.appendChild(headerDiv);
        this.appendChild(contentDiv);

        Object.setPrototypeOf(this, SectionComponent.prototype);

        return Object.assign(this, {
            selectors,
            classes,
            isVisible,
            contentDivs,
        });
    }

    /**
     * Add a component to a content DIV inside the section
     * @param {BaseComponent} component Component to add
     * @param {number} sectionContentId If section has multiple content DIVs, the index of the content DIV where you want to add the component.
     */
    addContent(component, sectionContentId = 0)
    {
        if(!component || !(component instanceof BaseComponent)) throw TypeError('Object trying to add is not a component.');
        this.contentDivs[sectionContentId].appendChild(component);
    }

    /**
     * Add a new content DIV to the section
     * @returns {number} The content DIV id
     */
    addSectionContentDiv()
    {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add(...this.classes.content);
        this.contentDivs.push(contentDiv);
        this.appendChild(contentDiv);
        return this.contentDivs.length - 1;
    }

    /**
     * Hide the section
     */
    hide()
    {
        this.classList.add('hidden-if-js');
        this.isVisible = !this.isVisible;
    }

    /**
     * Show the section
     */
    show()
    {
        this.classList.remove('hidden-if-js');
        this.isVisible = !this.isVisible;
    }

    /**
     * Toggle between hide and show
     */
    toggle()
    {
        if(this.isVisible) this.hide();
        else this.show();
    }

}