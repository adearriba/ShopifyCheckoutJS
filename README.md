# ShopifyCheckoutJS <!-- omit in toc -->
A little library that will help you manipulate Shopify´s Checkout via JS.

- [Other versions](#other-versions)
- [1. Install](#1-install)
- [2. $checkout object](#2-checkout-object)
	- [2.1. Events](#21-events)
- [3. Components](#3-components)
	- [3.1. General component methods](#31-general-component-methods)
	- [3.2. Sections](#32-sections)
	- [3.3. Radio buttons group](#33-radio-buttons-group)
- [4. Fields](#4-fields)
	- [4.1. General field methods](#41-general-field-methods)
	- [4.2. TextFields](#42-textfields)
	- [4.3. Checkboxs](#43-checkboxs)
	- [4.4. Dropdowns](#44-dropdowns)
- [5. Shipping methods](#5-shipping-methods)
	- [5.1. Add description to shipping method](#51-add-description-to-shipping-method)
	- [5.2. Get/set checked status](#52-getset-checked-status)
	- [5.3. Get shipping info](#53-get-shipping-info)
- [6. Payment methods](#6-payment-methods)
	- [6.1. Add description to payment method](#61-add-description-to-payment-method)
	- [6.2. Get/set checked status](#62-getset-checked-status)
	- [6.3. Get payment method info](#63-get-payment-method-info)

# Other versions

Please refer to each version branch in case you are using a previous verions.

**Important: ``V0.2.0 has breaking changes.``**

v0.1.0: https://github.com/adearriba/ShopifyCheckoutJS/tree/v0.1.0

# 1. Install

```javascript
npm i @adearriba/shopify-checkout
```

# 2. $checkout object
The `$checkout` object is created to help with the different tasks manipulating Shopify´s checkout page.

## 2.1. Events
To register handlers for common events, you can use the `$checkout.on(event, callback)` function.
```javascript
import { $checkout } from '@adearriba/shopify-checkout/checkout.js';

$checkout.on('load', (e) => { console.log(e); })

$checkout.on('load:information', function(e) { 
	console.log(e); 
})

$checkout.on('error', function(e) { 
	console.trace(); 
})
```
**Loading events**

This are events related to loading or changing a page/step during the checkout process:
|Event name|Descripcion|
|---|---|
|continue|Triggers whenever any of any checkout pages are submitted.|
|load|This is triggered for convenience in every Shopify´s ``page:load`` or ``page:change`` event.|
|load:information|**Information** step is loaded|
|load:shipping|**Shipping** step is loaded. The ``event.detail`` object contains the shipping methods shown in the page.|
|load:payment|**Payment** step is loaded. The ``event.detail`` object contains the payment methods shown in the page.|
|load:processing|**Processing** page is loaded|
|load:thankyou|**Thank you** page is loaded|
|load:orderstatus|**Order status** page is loaded|
|load:stockproblems|**Stock problems** page is loaded. The ``event.detail`` object contains a list of name and variant of the products shown in the page.|


**Interactive events**

This are events related to interactions with the UI.

|Event name|Descripcion|
|---|---|
|shippingmethod:changed|When a shipping method is selected. The ``event.detail`` contains the [shipping method object](#4-shipping-methods).|
|paymentmethod:changed|When a payment method is selected. The ``event.detail`` contains the [payment method object](#5-payment-methods).|
|component:changed|When a component's value changes. The ``event.detail`` contains the component that changed.|
|field:changed|When a field's value changes. The ``event.detail`` contains the field that changed. Not all Fields are components so this is a special type of InputComponent.|


**Other events**

|Event name|Descripcion|
|---|---|
|error|When an exception is catch inside a callback of any triggered event|
|field:created|When a field is **created**. The field reference is inside the ``event.detail`` property.|
|field:removed|When a field is **removed**. The field reference is inside the ``event.detail`` property.|

# 3. Components

## 3.1. General component methods

**Insert components into the DOM**

Components can be inserted before or after another components. Here an example with fields, which are a specific type of component. Below you'll find an example for sections.

```javascript
$checkout.fields["checkout_billing_address_phone"].insertBefore(field);
$checkout.fields["checkout_billing_address_last_name"].insertAfter(field);
```

**Watch for changes in components**

When a component changes, the ``checkout:component:changed`` event triggers. Note: In case of fields, a ``checkout:field:changed`` event triggers. For a shorthand, instead of remembering the name of the event, you can use ``onValueChanged(callback)`` for both components and fields. At the same time, you can also use ``on('changed', callback)``.

```javascript
field.onValueChanged(function(event){
	console.log(event);
});

field.on('changed', function(event){
	console.log(event);
});

component.onValueChanged(function(event){
	console.log(event);
});

component.on('changed', function(event){
	console.log(event);
});
```

## 3.2. Sections
In Shopify's checkout, you'll encounter different sections within a page. In case you want to create a new section for an additional form or separate controllers, you can do so.

**Get a section that already exists**
```javascript
//Using a css selector, you can create a reference to an existing section
let shippingFormSection = new SectionComponent({selector: '.section--shipping-address'});
```

**Create a new section and add it before/after another one**
```javascript
//Create a new Section component
let section = new SectionComponent({name: 'shipping-method', title: 'Shipping method'});

//Add the section before or after the previous reference
shippingFormSection.insertBefore(section);
shippingFormSection.insertAfter(section);
```

## 3.3. Radio buttons group

**Create a radiobox in a section**
```javascript
//Create a new RadioContentBoxComponent
var radioBox = new RadioContentBoxComponent({name: 'RadioContentBox' });

//Create an option using innerHTML instead of a text label
let option1 = {
	htmlFor: 'shipping', 
	value: 'shipping', 
	innerHTML: '<svg aria-hidden="true" class="icon-svg icon-svg--size-18 icon-svg--inline-before" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M17.816 14c-.415-1.162-1.514-2-2.816-2-1.302 0-2.4.838-2.816 2H12v-4h6v4h-.184zM15 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM2 4h8v10H7.816C7.4 12.838 6.302 12 5 12c-1.302 0-2.4.838-2.816 2H2V4zm13.434 1l1.8 3H12V5h3.434zm4.424 3.485l-3-5C16.678 3.185 16.35 3 16 3h-4c0-.552-.448-1-1-1H1c-.552 0-1 .448-1 1v12c0 .552.448 1 1 1h1.185C2.6 17.162 3.698 18 5 18s2.4-.838 2.816-2h4.37c.413 1.162 1.512 2 2.814 2s2.4-.838 2.816-2H19c.552 0 1-.448 1-1V9c0-.18-.05-.36-.142-.515z" fill-rule="evenodd"></path></svg>Shipping'};

//Using a text label
let option2 = {label: 'Pickup in Store', htmlFor: 'pickup', value: 'pickup'};

//Add options to RadioContentBoxComponent
radioBox.addOption(option1);
radioBox.addOption(option2);

//Add the RadioContentBoxComponent to the previous section
section.addContent(radioBox);

//Insert the new section before the existing shippingFormSection
shippingFormSection.insertBefore(section);
```

**Result**
![RadioContentBoxComponent](/imgs/shipping_methods.PNG)

**Get selected value**
```javascript
console.log(radioBox.value);
```


# 4. Fields
Fields are a special kind of components with additional functionality. Different types of fields can be created. Whenever a field is created with its constructor, it is added to the ``$checkout.fields`` dictionary with its key being ``'checkout_attributes_' + ${name}``.

For Shopify´s original form fields, they are registered in the dictionary with the input´s id. For example, the address line 1 would be:

```javascript
//Shopify´s form fields using their id
$checkout.fields["checkout_billing_address_address1"]

//$checkout created fields using the field´s name given upon creation
$checkout.fields["checkout_attributes_fieldName"]
```

## 4.1. General field methods

**Get input value**
```javascript
console.log(field.value);
field.value = '';
```

**Add an error message and color**

You can add a red border to the input and a message below it. The message can contain HTML elements in it.

```javascript
field.showError('Testing error message with <b>bold</b> text!');
```

**Remove errors**

Remove the error state.

```javascript
field.removeError();
```

## 4.2. TextFields

**Create TextFields**
```javascript
var field = new TextField({
	name:'dni',
	//Optional properties
	type: 'text', 
	placeholder:'DNI', 
	label:'DNI',
	size: 30, 
	defaultValue: '', 
	tooltip: 'Content of the tooltip'
});

//Accesible also from $checkout.fields
console.log($checkout.fields["checkout_attributes_dni"]);
```

**Add tooltip to field**
```javascript
field.addTooltip('The content of the tooltip');
```

**Adding it to the DOM**
```javascript
$checkout.fields["checkout_billing_address_phone"].insertBefore(field);
```

## 4.3. Checkboxs

**Create Checkbox**
```javascript
var field = new CheckboxField({
	name:'dni', 
	//Optional properties
	label:'DNI',
	checked: true, // default: false
});
```

**Get and set checked state**
```javascript
field.checked = true;
console.log(field.checked);
```

## 4.4. Dropdowns

**Create a dropdown/select**
```javascript
var select = new DropdownField({
    name: 'selections',
    options: [
        { text: 'option1', value: 1 },
        { text: 'option2', value: 2 },
        { text: 'option3', value: 3 },
        { text: 'option4', value: 4 },
        { text: 'option5', value: 5 },
	],
	//optional properties
	defaultValue: 'First & disabled Option', 
	label:'Selections',
});
```

**Get selected value**
```javascript
console.log(select.value);
```

# 5. Shipping methods
When the ``load:shipping`` event is triggered, the ``event.detail`` object contains the shipping methods shown to the customer.

## 5.1. Add description to shipping method
You can add a little description beneath the shipping method name. This accepts HTML so it can be more flexible.

```javascript
$checkout.on('load:shipping', e => { 
    let shippingMethods = e.detail.shippingMethods;
    shippingMethods[0].addDescription('Shipping by <b>UPS</b>')
});
```

## 5.2. Get/set checked status
```javascript
...
shippingMethods[0].checked = true;
console.log(shippingMethods[0].checked);
...
```

## 5.3. Get shipping info
The shipping method object has direct access to the shipping rate and subtotal price (lineitems + shipping rate). More data can be obtained from the ``methodData`` property.
```javascript
console.log(shippingMethods[0].shippingRate);
console.log(shippingMethods[0].subtotalPrice);

console.log(shippingMethods[0].methodData);
```

# 6. Payment methods
When the ``load:payment`` event is triggered, the ``event.detail`` object contains the payment methods shown to the customer.

## 6.1. Add description to payment method
You can add a little description in the content box beneath the payment method radio button. This accepts HTML so it can be more flexible.

```javascript
$checkout.on('load:payment', e => { 
    let paymentMethods = e.detail.paymentMethods;
    paymentMethods[1].addDescription('Payment using <b>Paypal</b>')
});
```

## 6.2. Get/set checked status
```javascript
...
paymentMethods[0].checked = true;
console.log(paymentMethods[0].checked);
...
```

## 6.3. Get payment method info
The payment method object has direct access to the gateway ID and gateway name. More data can be obtained from the ``methodData`` property.

```javascript
console.log(paymentMethods[0].gatewayId);
console.log(paymentMethods[0].gatewayName);

console.log(paymentMethods[0].methodData);
```