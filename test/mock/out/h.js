/* eslint-disable */
/**
 * Test
 * @param {object} options Test
 * @param {string} options.a Test
 * @param {number} options.b Test
 * @param {boolean} options.c Test
 * @param {object} [options.nested] Test
 * @param {string} options.nested.a Test
 * @param {number} [options.nested.b] Test
 * @param {boolean} options.nested.c Test
 */
function test(options) {
	var error = (function(){if ( typeof options !== "object") {
		return new Error("Parameter options is not defined, or is not of type object");
	}if (typeof options !== "undefined" &&  typeof options.a !== "string") {
		return new Error("Parameter options.a is not defined, or is not of type string");
	}if (typeof options !== "undefined" &&  typeof options.b !== "number") {
		return new Error("Parameter options.b is not defined, or is not of type number");
	}if (typeof options !== "undefined" &&  typeof options.c !== "boolean") {
		return new Error("Parameter options.c is not defined, or is not of type boolean");
	}if (typeof options !== "undefined" &&  typeof options.nested !== "undefined") {if (typeof options !== "undefined" &&  typeof options.nested !== "object") {
		return new Error("Parameter options.nested is not defined, or is not of type object");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.a !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.a !== "string") {
		return new Error("Parameter options.nested.a is not defined, or is not of type string");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.b !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.b !== "number") {
		return new Error("Parameter options.nested.b is not defined, or is not of type number");
	}}if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.c !== "undefined") {if (typeof options !== "undefined" && typeof options.nested !== "undefined" &&  typeof options.nested.c !== "boolean") {
		return new Error("Parameter options.nested.c is not defined, or is not of type boolean");
	}}return false;})();
}
