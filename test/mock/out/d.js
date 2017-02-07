/* eslint-disable */
/**
 * Test
 * @param {string} a Test
 * @param {number} b Test
 */
function test(a, b) {
	var error = (function(){if ( typeof a !== "string") {
		return {"reason":"INVALID_TYPE_OR_PARAMETER_NOT_DEFINED","details":{"parameter":"a","expectedType":"string"}};
	}if ( typeof b !== "number") {
		return {"reason":"INVALID_TYPE_OR_PARAMETER_NOT_DEFINED","details":{"parameter":"b","expectedType":"number"}};
	}return false;})();
}
