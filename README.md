Popups for Elgg
===============
![Elgg 2.0](https://img.shields.io/badge/Elgg-2.0.x-orange.svg?style=flat-square)

## Features

* Coverts popups into an AMD module
* Allows to programmically open and close popups
* Allows passing popup position via `data-` parameters of the trigger


## Usage

### Bind by href attribute

This behaviour is identical to adding `rel="popup"` to your anchor element.

```php
echo elgg_view('output/url', array(
	'class' => 'popup-trigger',
	'href' => '#popup',
));
```

```js
define(function(require) {
	var $ = require('jquery');
	var popup = require('elgg/popup');
	popup.bind($('.popup-trigger'));
});
```

### Custom elements

```php
echo elgg_format_element('button', [
	'class' => 'elgg-button elgg-button-popup',
	'data-my' => 'center top',
	'data-at' => 'center bottom+10px',
], 'Open Popup');
echo elgg_format_element('div', [
	'class' => 'elgg-module elgg-module-popup hidden',
], 'My popup');
```

```js
define(function(require) {
	var $ = require('jquery');
	$(document).on('click', '.elgg-button-popup', function(e) {
		e.preventDefault();
		var $trigger = $(this);
		var $target = $(this).next('.elgg-module-popup');
		if ($target.length) {
			require(['elgg/popup'], function(popup) {
				popup.open($trigger, $target, {
					'collision': 'fit none'
				});
			});
		}
	});
});
```
