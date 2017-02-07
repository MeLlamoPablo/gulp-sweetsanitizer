"use strict";

const assertDefined    = require("./assertDefined")
	, assertInstanceOf = require("./assertInstanceOf")
	, assertType       = require("./assertType")
	, jsPrimitiveTypes = require("./constants").jsPrimitiveTypes;

/**
 * Determines the correct assertion for the given parameter. This is only useful for non
 * primitive types.
 *
 * This function performs the following checks:
 *
 * 1.- If the type has been defined in a typedef, then it returns the assertion of said typedef.
 * 2.- Otherwise, we check if the global object exists. If it doesn't, we simply assert that
 * the parameter is not undefined.
 *
 * @param {string} parameter The parameter to analyze.
 * @param {string} type The expected type of parameter.
 * @param {Typedef[]} typedefs An array with all typedefs to check if the parameter belongs to any.
 * @param {ErrorGenerator} errorGen The current error generator.
 * @returns {string} A javascript code that returns an error if the assertion is failed.
 */
function findAssertionForNonPrimitiveType(parameter, type, typedefs, errorGen) {
	let typedefIndex = typedefs.map(t => t.name).indexOf(type);
	if (typedefIndex !== -1) {

		let result = "";
		let typedef = typedefs[typedefIndex];

		result += assertDefined(parameter, errorGen);

		for (let prop of typedef.properties) {

			if (prop.required) {

				result += assertDefined(`${parameter}.${prop.name}`, errorGen);

				if (jsPrimitiveTypes.indexOf(prop.type) !== -1) {
					result += assertType(`${parameter}.${prop.name}`, prop.type, errorGen);
				} else {
					result += findAssertionForNonPrimitiveType(
						`${parameter}.${prop.name}`, prop.type, typedefs, errorGen
					);
				}

			} else {

				result += `if (typeof ${parameter}.${prop.name} !== "undefined") {`;

				if (jsPrimitiveTypes.indexOf(prop.type) !== -1) {
					result += assertType(`${parameter}.${prop.name}`, prop.type, errorGen);
				} else {
					result += findAssertionForNonPrimitiveType(
						`${parameter}.${prop.name}`, prop.type, typedefs, errorGen
					);
				}

				result += "}";
			}

		}

		return result;

	} else {

		return `if (typeof ${parameter} === "undefined"
			&& typeof ${type} === "function") {
			${assertInstanceOf(parameter, type, errorGen)}
		} else {
			${assertDefined(parameter, errorGen)}
		}`;

	}
}

module.exports = findAssertionForNonPrimitiveType;
