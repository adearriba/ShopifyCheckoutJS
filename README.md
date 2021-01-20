
# ShopifyCheckoutJS
A little code for having a better experience manipulating Shopify´s Checkout via JS.

# $checkout object
The `$checkout` object is created to help with the different tasks manipulating Shopify´s checkout page.

## Events
To register handlers for common events, you can use the `$checkout.on(event, callback)` function.
```javascript
$checkout.on('load', (e) => { console.log(e); })

$checkout.on('load', function(e) { 
	console.log(e); 
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

# Fields
To-Do...

## TextFields

**Create TextFields**
```javascript
var field = new TextField({
	type: 'text', 
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
field.addTooltip({text: 'The content of the tooltip'});
```

**Adding it to the DOM *without* JQuery**
```javascript
var addressField = document.querySelector('[data-address-field="address1"]');
addressField.insertAdjacentElement('afterend', field.element);
```

**Adding it to the DOM with JQuery**
```javascript
$('[data-address-field="address1"]').after(field.element);
```


