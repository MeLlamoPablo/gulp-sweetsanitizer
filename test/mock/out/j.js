/* eslint-disable */
/**
 * Test
 * @param {MyType} a Test
 */
function test(a) {
	var error = (function(){if ( typeof a === "undefined") {
		return new Error("Parameter a is not defined");
	}if (typeof a.a !== "undefined") {if (typeof a !== "undefined" &&  typeof a.a !== "string") {
		return new Error("Parameter a.a is not defined, or is not of type string");
	}}if (typeof a.b !== "undefined") {if (typeof a !== "undefined" &&  typeof a.b !== "number") {
		return new Error("Parameter a.b is not defined, or is not of type number");
	}}if (typeof a !== "undefined" &&  typeof a.c === "undefined") {
		return new Error("Parameter a.c is not defined");
	}if (typeof a !== "undefined" &&  typeof a.c !== "boolean") {
		return new Error("Parameter a.c is not defined, or is not of type boolean");
	}return false;})();
}

/**
 * @typedef {object} MyType
 * @property {string} [a] A property
 * @property {number} [b] A property
 * @property {boolean} c A property
 */
