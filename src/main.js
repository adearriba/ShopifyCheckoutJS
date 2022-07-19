import Checkout from './Checkout.js';
import RadioContentBoxComponent from './Components/RadioContentBoxComponent.js';
import SectionComponent from './Components/SectionComponent.js';
import CheckboxField from './Components/CheckboxField.js';
import TextField from './Components/TextField.js';
import DropdownField from './Components/DropdownField.js';
import ShippingMethod from './Methods/ShippingMethod.js';
import PaymentMethod from './Methods/PaymentMethod.js';

window.$checkout = new Checkout();

export {
    Checkout,
    CheckboxField,
    TextField,
    DropdownField,
    SectionComponent,
    RadioContentBoxComponent,
    ShippingMethod,
    PaymentMethod,
}