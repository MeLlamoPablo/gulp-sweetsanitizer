/* eslint-disable */
/**
 * Test
 * @param {WtfIsThisType} option Test
 */
function test(option) {
	var error = (function(){if (typeof option === "undefined"
			&& typeof WtfIsThisType === "function") {
			if (!(option instanceof WtfIsThisType)) {
		return {"reason":"INVALID_TYPE","details":{"parameter":"option","expectedType":"WtfIsThisType"}};
	}
		} else {
			if ( typeof option === "undefined") {
		return {"reason":"PARAMETER_NOT_DEFINED","details":{"parameter":"option"}};
	}
		}return false;})();
}
