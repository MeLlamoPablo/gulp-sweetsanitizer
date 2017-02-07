"use strict";

const assertParentDefined = require("./assertParentDefined");

/**
 * Asserts that the given parameter is of a given type.
 * @param {string} parameter The parameter to analyze.
 * @param {string} type The expected type of parameter.
 * @param {ErrorGenerator} errorGen The current error generator.
 * @returns {string} A javascript code that returns an error if the assertion is failed.
 */
function assertType(parameter, type, errorGen) {
	return `if (${assertParentDefined(parameter)} typeof ${parameter} !== "${type}") {
		return ${errorGen.invalidTypeOrUndefined(parameter, type)};
	}`;
}

module.exports = assertType;
