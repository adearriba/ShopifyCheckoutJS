import {Checkout} from './Checkout.js';
import {BaseComponent} from './Components/BaseComponent';
import {BaseInputComponent} from './Components/BaseInputComponent';
import {RadioContentBoxComponent} from './Components/RadioContentBoxComponent.js';
import {SectionComponent} from './Components/SectionComponent.js';
import {CheckboxField} from './Components/CheckboxField.js';
import {TextField} from './Components/TextField.js';
import {DropdownField} from './Components/DropdownField.js';
import {ShippingMethod} from './Methods/ShippingMethod.js';
import {PaymentMethod} from './Methods/PaymentMethod.js';

let $checkout = new Checkout();

export {
    $checkout,
    CheckboxField,
    TextField,
    DropdownField,
    SectionComponent,
    RadioContentBoxComponent,
    ShippingMethod,
    PaymentMethod,
    BaseComponent,
    BaseInputComponent
}