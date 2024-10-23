'use strict';

const jsonTextInputValue = {};

function jsonTextInputActivate(id, defaultValue) {
    if (typeof id !== 'string') {
		if (! input) {
			throw new Error(`Non-string element id'`);
		}
    }
    if (jsonTextInputValue[id] !== undefined) {
		throw new Error(`Element '${id}' is already activated`);
    }
    const input = document.getElementById(id);
    if (! input) {
		throw new Error(`Can't find element '${id}'`);
    }
    if (input.tagName !== 'INPUT' || input.getAttribute('type') !== 'text') {
		throw new Error(`Element '${id}' is not <INPUT TYPE="text" />`);
    }
    if (defaultValue === undefined) {
		defaultValue = null;
    }
    if (! legalValue(defaultValue)) {
		throw new Error(`Invalid defalult value for element '${id}'`);
    }
    input.addEventListener('input', function() { change(id, input); });
    input.value = JSON.stringify(defaultValue);
    change(id, input);
    function legalValue(x) {
		return (Number.isFinite(x) || typeof x === 'string' || typeof x === 'boolean' || x === null);
    }
    function change(id, input) {
		let value;
		try {
			value = JSON.parse(input.value);
			if (! legalValue(value)) {
				throw new Error('Bad value');
			}
		} catch (e) {
			value = undefined;
		}
		if (value === undefined) {
			input.style.backgroundColor = '#f2dcdf';
		} else {
			input.style.backgroundColor = '#e0f2dc';
		}
		jsonTextInputValue[id] = value;
    }
}
