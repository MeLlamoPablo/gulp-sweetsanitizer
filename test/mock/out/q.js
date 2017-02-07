/* eslint-disable */
/**
 * Test
 * @param {string} a Test
 * @param {number} b Test
 */
function test(a, b) {
	var error = (function(){if ( typeof a !== "string") {
		return new Error("Parameter a is not defined, or is not of type string");
	}if ( typeof b !== "number") {
		return new Error("Parameter b is not defined, or is not of type number");
	}return false;})();
}

/**
 * Test 2
 * @param {string} b Test
 * @param {number} a Test
 */
function test2(b, a) {
	var error = (function(){if ( typeof b !== "string") {
		return new Error("Parameter b is not defined, or is not of type string");
	}if ( typeof a !== "number") {
		return new Error("Parameter a is not defined, or is not of type number");
	}return false;})();
}
