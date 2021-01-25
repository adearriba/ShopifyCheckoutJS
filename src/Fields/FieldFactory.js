import Field from './Field.js';
import TextField from './TextField.js';
import CheckboxField from './CheckboxField.js';
import DropdownField from './DropdownField.js';
import NotValidFieldException from '../Exceptions/NotValidFieldException.js';

export default class FieldFactory {
    constructor(){ }

    createFieldByElement(element){
        switch (element.type) {
            case 'text':
                return new TextField(element.id);
            case 'email':
                return new TextField(element.id);
            case 'tel':
                return new TextField(element.id);
            case 'checkbox':
                return new CheckboxField(element.id);
            case 'select-one':
                return new DropdownField(element.id);
            case 'hidden':
                return null;
            default:
                try{
                    return new Field(element.id);
                }catch(e){
                    if(e instanceof NotValidFieldException) return null;
                    else throw e;
                }
        }
    }
}