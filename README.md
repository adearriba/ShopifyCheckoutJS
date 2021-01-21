
# 1. ShopifyCheckoutJS
A little code for having a better experience manipulating Shopify´s Checkout via JS.

- [1. ShopifyCheckoutJS](#1-shopifycheckoutjs)
- [2. $checkout object](#2-checkout-object)
	- [2.1. Events](#21-events)
- [3. Fields](#3-fields)
	- [3.1. TextFields](#31-textfields)
	- [3.1. Checkboxs](#31-checkboxs)

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

# 3. Fields
To-Do...

## 3.1. TextFields

**Create TextFields**
```javascript
var field = new TextField({
	type: 'text', //optional
	name:'dni', 
	placeholder:'DNI', //optional
	label:'DNI', //optional
	size: 30, //optional
	defaultValue: '', //optional
	tooltip: 'Content of the tooltip' //optional
});
```

**Add tooltip to field**
```javascript
field.addTooltip('The content of the tooltip');
```

**Adding it to the DOM *without* JQuery**
```javascript
var addressField = document.querySelector('[data-address-field="address1"]');
addressField.insertAdjacentElement('afterend', field);
```

**Adding it to the DOM with JQuery**
```javascript
$('[data-address-field="address1"]').after(field);
```

## 3.1. Checkboxs

**Create Checkbox**
```javascript
var field = new CheckboxField({
	name:'dni', 
	label:'DNI', //optional
	checked: true, // default: false
});
```

**Is checked?**
```javascript
console.log(field.checked);
```