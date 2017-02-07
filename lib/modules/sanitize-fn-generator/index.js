"use strict";

const ErrorGenerator                   = require("./ErrorGenerator")
	, UglifyJS                         = require("uglify-js")
	, assertParentDefined              = require("./assertParentDefined")
	, assertType                       = require("./assertType")
	, childrenPropertyRegex            = require("../regex").childrenProperty
	, findAssertionForNonPrimitiveType = require("./findAssertionForNonPrimitiveType")
	, jsPrimitiveTypes                 = require("./constants").jsPrimitiveTypes;

/**
 * Generates the sanitize function corresponding to one function comment. This function will
 * replace the call to sweetSanitizer(); and will return an Error in case something goes wrong,
 * or will return false if everything is good.
 *
 * @param {object} comment The parsed JSDoc comment, parsed with parseJsdoc()
 * @param {object} callOptions The options passed to sweetSanitizer();
 * @param {Typedef[]} typedefs An array of all known typedefs.
 * @return {string} The generated function
 */
function generateSanitizeFunction(comment, callOptions, typedefs) {
	// Default options
	let options = Object.assign({
		machine_readable_error: false,
		uglify: true
	}, callOptions);

	let errorGen = new ErrorGenerator(!options.machine_readable_error);

	let result = "";
	let tags = comment.tags.filter(tag => tag.title === "param"); // Relevant tags only.

	/**
	 * If an object is optional, then all of its properties must be optional as well.
	 *
	 * In order to determine that, we get the parent object, and check if the property we're
	 * evaluating is a children. If true, we force its "required" attribute to be optional.
	 */
	for (let tag of tags.filter(tag => tag.required)) {
		let parentPropMatches = tag.name.match(childrenPropertyRegex);

		if (parentPropMatches) {
			let parentTag = tags.find(tag => tag.name === parentPropMatches[1]);

			if (!parentTag.required) {
				tag.required = false;
			}
		}
	}

	/*
	 * We first make sure that all required parameters correspond to their expected type.
	 * That also implies that they are passed, because if they're not, they're undefined,
	 * and therefore they're not of their expected type.
	 *
	 * We return an error otherwise.
	 */
	for (let tag of tags.filter(tag => tag.required)) {
		// For simple types, this is easy. typeof will do.
		if (jsPrimitiveTypes.indexOf(tag.type) !== -1) {
			result += assertType(tag.name, tag.type, errorGen);
		} else {
			result += findAssertionForNonPrimitiveType(
				tag.name, tag.type, typedefs, errorGen
			);
		}
	}

	/*
	 * Then we make sure that all optional parameters correspond to their expected type, but
	 * only if they are passed. Otherwise undefined is OK.
	 */
	for (let tag of tags.filter(tag => !tag.required)) {
		result += `if (${assertParentDefined(tag.name)} typeof ${tag.name} !== "undefined") {`;

		if (jsPrimitiveTypes.indexOf(tag.type) !== -1) {
			result += assertType(tag.name, tag.type, errorGen);
		} else {
			result += findAssertionForNonPrimitiveType(
				tag.name, tag.type, typedefs, errorGen
			);
		}

		result += "}";
	}

	/*
	 * Now we can define the default values for optional parameters of objects.
	 * Keep in mind that the user should specify the default values for the function in
	 * the very function signature. i.e:
	 *
	 * function test(foo = "bar") {}
	 *
	 * sweetSanitizer takes for granted that default values for non-objects are already defined.
	 */
	for (let object of tags.filter(tag => tag.type === "object")) {
		/* eslint-disable no-useless-escape */
		let isPropertyOfObjectRegex = new RegExp(object.name + "\.(?:.+)");
		/* eslint-enable no-useless-escape */

		let objectProperties = tags.filter(e => e.name.match(isPropertyOfObjectRegex));

		// Filter out required properties, we don't care about those.
		objectProperties = objectProperties.filter(e => !e.required);

		// Filter out properties without default values, we don't care about those either.
		objectProperties = objectProperties.filter(e => !!e.default);

		if (objectProperties.length > 0) {
			// If we have at least one valid property, we can add our Object.assign code.
			result += "var defaults = {";

			for (let property of objectProperties) {
				let propertyName = property.name.replace(object.name + ".", "");

				// If the property still has a parent, it means that it is of a nested object.
				// Don't care about those, they will be addressed in further iterations.
				if (!propertyName.match(childrenPropertyRegex)) {
					result += `${propertyName}: ${property.default}`;

					// Don't write a comma to the last property.
					if (objectProperties.indexOf(property) !== objectProperties.length - 1) {
						result += ",";
					}
				}
			}

			result += "};";

			result += `${object.name} = Object.assign(defaults, ${object.name});`;
		}
	}

	/*
	 * If all checks have passed, it means that no errors have occurred.
	 * We can return false (Keep in mind that the result of this function will be handled
	 * as an error by the user. In this case, false = no errors).
	 */
	result += "return false;";

	/*
	 * And last, we wrap the function into an IIFE that returns the error,
	 * so the user can easily handle it.
	 */
	result = `(function(){${result}})()`;

	if (options.uglify) {
		// Uglify the file, and also make some optimizations.
		result = UglifyJS.minify(result, { fromString: true }).code;

		// Uglify puts a semicolon at the end, which results in a syntax error if the
		// user puts a semicolon after sweetSanitizer(). So, remove it.
		result = result.substr(0, result.length - 1);
	}

	return result;
}

module.exports = generateSanitizeFunction;
