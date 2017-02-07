/* eslint-disable */
/**
 * Test
 * @param {string} a Test
 * @param {number} b Test
 */
function test(a, b) {
	var error = !function(){return"string"!=typeof a?new Error("Parameter a is not defined, or is not of type string"):"number"!=typeof b&&new Error("Parameter b is not defined, or is not of type number")}();
}
