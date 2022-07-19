export default class BaseComponent extends HTMLDivElement{
    constructor(args = null)
    {
        let componentType = 'component';
        if(args)
        {
            componentType = args.type ?? 'component'; 
        }
        
        let element = document.createElement('div');
        Object.setPrototypeOf(element, BaseComponent.prototype);

        return Object.assign(element, {
            componentType
        });
    }

    /**
     * Insert the current component after the specified component parameter.
     * @param {BaseComponent} component 
     * @throws {TypeError} Object trying to add is not a component
     */
    insertAfter(component){
        if(!component || !(component instanceof BaseComponent)) throw TypeError('Object trying to add is not a component.');
        this.insertAdjacentElement('afterend', component);
    }

    /**
     * Insert the current component before the specified component parameter.
     * @param {BaseComponent} component 
     * @throws {TypeError} Object trying to add is not a component
     */
    insertBefore(component){
        if(!component || !(component instanceof BaseComponent)) throw TypeError('Object trying to add is not a component.');
        this.insertAdjacentElement('beforebegin', component);
    }
}