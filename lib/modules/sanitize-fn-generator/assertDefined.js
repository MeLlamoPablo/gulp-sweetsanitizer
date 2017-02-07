"use strict";

const assertParentDefined = require("./assertParentDefined");

/**
 * Asserts that the given parameter is not undefined.
 * @param {string} parameter The parameter to analyze.
 * @param {ErrorGenerator} errorGen The current error generator.
 * @returns {string} A javascript code that returns an error if the assertion is failed.
 */
function assertDefined(parameter, errorGen) {
	return `if (${assertParentDefined(parameter)} typeof ${parameter} === "undefined") {
		return ${errorGen.paramNotDefined(parameter)};
	}`;
}

module.exports = assertDefined;
