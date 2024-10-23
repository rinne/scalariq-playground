'use strict';

const urlTextInputValue = {};

function urlTextInputActivate(id, defaultValue) {
    if (typeof id !== 'string') {
		if (! input) {
			throw new Error(`Non-string element id'`);
		}
    }
    if (urlTextInputValue[id] !== undefined) {
		throw new Error(`Element '${id}' is already activated`);
    }
    const input = document.getElementById(id);
    if (! input) {
		throw new Error(`Can't find element '${id}'`);
    }
    if (input.tagName !== 'INPUT' || input.getAttribute('type') !== 'text') {
		throw new Error(`Element '${id}' is not <INPUT TYPE="text" />`);
    }
    if (! defaultValue) {
		defaultValue = '';
    }
    if (typeof(defaultValue) !== 'string') {
		throw new Error(`Invalid defalult value for element '${id}'`);
    }
    input.addEventListener('input', function() { change(id, input); });
    input.value = defaultValue;
    change(id, input);
    function change(id, input) {
		let value = input.value;
		if (value === '') {
			input.style.backgroundColor = 'transparent';
			return;
		}
		try {
			value = URL.parse(input.value);
			if (! (value &&
				   value?.href &&
				   (value.href.length <= 2048) &&
				   value?.host &&
				   value?.hostname &&
				   (value.hostname.length <= 253) &&
				   ( /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/.test(value.hostname) ||
					 /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]))*$/.test(value.hostname)) &&
				   ((value.protocol === 'http:' || (value.protocol === 'https:')) &&
					/^https?:\/\/[^/]/.test(input.value)))) {
				throw new Error('Not a valid URL');
			}
		} catch (e) {
			value = undefined;
		}
		if (value === undefined) {
			input.style.backgroundColor = '#f2dcdf';
		} else {
			input.style.backgroundColor = '#e0f2dc';
		}
		urlTextInputValue[id] = value?.href;
    }
}
