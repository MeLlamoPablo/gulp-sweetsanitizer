"use strict";

/**
 * Asserts that the given parameter is an instance of a given class
 * @param {string} parameter The parameter to analyze.
 * @param {string} instanceOf The expected class of the parameter.
 * @param {ErrorGenerator} errorGen The current error generator.
 * @returns {string} A javascript code that returns an error if the assertion is failed.
 */
function assertInstanceOf(parameter, instanceOf, errorGen) {
	return `if (!(${parameter} instanceof ${instanceOf})) {
		return ${errorGen.invalidType(parameter, instanceOf)};
	}`;
}

module.exports = assertInstanceOf;
