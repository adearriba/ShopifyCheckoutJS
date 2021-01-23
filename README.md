# ShopifyCheckoutJS <!-- omit in toc -->
A little library that will help you manipulate Shopify´s Checkout via JS.

- [1. Build JS](#1-build-js)
- [2. $checkout object](#2-checkout-object)
	- [2.1. Events](#21-events)
- [3. Fields](#3-fields)
	- [3.1. General field methods](#31-general-field-methods)
	- [3.2. TextFields](#32-textfields)
	- [3.3. Checkboxs](#33-checkboxs)
	- [3.4. Dropdowns](#34-dropdowns)

# 1. Build JS

To build the project using gulp, run 'gulp build' command from the console. (You will need npm installed)
```javascript
npm install //first time to install dependencies
gulp build //build project
```

# 2. $checkout object
The `$checkout` object is created to help with the different tasks manipulating Shopify´s checkout page.

## 2.1. Events
To register handlers for common events, you can use the `$checkout.on(event, callback)` function.
```javascript
$checkout.on('load', (e) => { console.log(e); })

$checkout.on('load:information', function(e) { 
	console.log(e); 
})

$checkout.on('error', function(e) { 
	console.trace(); 
})
```
The different types of events right now are:
|Event name|Descripcion|
|---|---|
|load|This is triggered for convenience in every Shopify´s ``page:load`` or ``page:change`` event.|
|load:information|**Information** step is loaded|
|load:shipping|**Shipping** step is loaded|
|load:payment|**Payment** step is loaded|
|load:processing|**Processing** page is loaded|
|load:thankyou|**Thank you** page is loaded|
|load:orderstatus|**Order status** page is loaded|
|load:stockproblems|**Stock problems** page is loaded|
|error|When an exception is catch inside a callback of any triggered event|
|field:created|When a field is **created**. The field reference is inside the ``event.detail`` property.|
|field:removed|When a field is **removed**. The field reference is inside the ``event.detail`` property.|

# 3. Fields
Different types of fields can be created. Whenever a field is created with its constructor, it is added to the ``$checkout.fields`` dictionary with its key being ``'checkout_attributes_' + ${name}``.

For Shopify´s original form fields, they are registered in the dictionary with the input´s id. For example, the address line 1 would be:

```javascript
//Shopify´s form fields using their id
$checkout.fields["checkout_billing_address_address1"]

//$checkout created fields using the field´s name given upon creation
$checkout.fields["checkout_attributes_fieldName"]
```


## 3.1. General field methods

**Get input value**
```javascript
console.log(field.value);
field.value = '';
```
**Insert fields into the DOM**

Fields can be inserted before or after another field:

```javascript
$checkout.fields["checkout_billing_address_phone"].insertBefore(field);

$checkout.fields["checkout_billing_address_last_name"].insertAfter(field);
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

## 3.2. TextFields

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

## 3.3. Checkboxs

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

## 3.4. Dropdowns

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
