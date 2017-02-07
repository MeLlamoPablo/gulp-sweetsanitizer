/* eslint-disable */
/**
 * Test
 * @param {WtfIsThisType} option Test
 */
function test(option) {
	var error = (function(){if (typeof option === "undefined"
			&& typeof WtfIsThisType === "function") {
			if (!(option instanceof WtfIsThisType)) {
		return new Error("Parameter option is not of type WtfIsThisType.");
	}
		} else {
			if ( typeof option === "undefined") {
		return new Error("Parameter option is not defined");
	}
		}return false;})();
}
