/* eslint-disable */
/**
 * Test
 * @param {object} options Test
 * @param {string} options.a Test
 * @param {number} options.b Test
 * @param {boolean} options.c Test
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
	}return false;})();
}
