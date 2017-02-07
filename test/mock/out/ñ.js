/* eslint-disable */
/**
 * Test
 * @param {object} options Test
 * @param {string} [options.a="default"] Test
 * @param {number} [options.b=123] Test
 * @param {boolean} [options.c=false] Test
 * @param {object} [options.nested] Test
 * @param {string} [options.nested.a="default2"] Test
 * @param {number} [options.nested.b=1234] Test
 * @param {boolean} [options.nested.c=true] Test
 */
function test(options) {
	var error = (function(){if ( typeof options !== "object") {
		return new Error("Parameter options is not defined, or is not of type object");
	}if (typeof options !== "undefined" &&  typeof options.a !== "undefined") {if (typeof options !== "undefined" &&  typeof options.a !== "string") {
		return new Error("Parameter options.a is not defined, or is not of type string");
	}}if (typeof options !== "undefined" &&  typeof options.b !== "undefined") {if (typeof options !== "undefined" &&  typeof options.b !== "number") {
		return new Error("Parameter options.b is not defined, or is not of type number");
	}}if (typeof options !== "undefined" &&  typeof options.c !== "undefined") {if (typeof options !== "undefined" &&  typeof options.c !== "boolean") {
		return new Error("Parameter options.c is not defined, or is not of type boolean");
	}}if (typeof options !== "undefined" &&  typeof options.nested !== "undefined") {if (typeof options !== "undefined" &&  typeof options.nested !== "object") {
		return new Error("Parameter options.nested is not defined, or is not of type object");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.a !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.a !== "string") {
		return new Error("Parameter options.nested.a is not defined, or is not of type string");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.b !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.b !== "number") {
		return new Error("Parameter options.nested.b is not defined, or is not of type number");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.c !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.c !== "boolean") {
		return new Error("Parameter options.nested.c is not defined, or is not of type boolean");
	}}var defaults = {a: "default",b: 123,c: false,};options = Object.assign(defaults, options);var defaults = {a: "default2",b: 1234,c: true};options.nested = Object.assign(defaults, options.nested);return false;})();
}
