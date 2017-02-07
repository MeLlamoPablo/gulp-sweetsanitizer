"use strict";

const childrenPropertyRegex = require("../regex").childrenProperty;

/**
 * Returns a condition that assert that the parent of an object is defined.
 * This is because you can't directly assert that "parent.children" is defined: if parent
 * is not defined, that would produce a ReferenceError.
 *
 * @param {string} parameter The name of the parameter
 * @return {string} The assertion condition
 *
 * @example
 * assertParentDefined("children"); // --> "" (empty string)
 * assertParentDefined("parent.children");
 * // --> typeof parent !== "undefined" &&
 * assertParentDefined("grandparent.parent.children");
 * // --> typeof grandparent !== "undefined" && typeof grandparent.parent !== "undefined" &&
 */
function assertParentDefined(parameter) {
	let parentPropMatches = parameter.match(childrenPropertyRegex);

	if (parentPropMatches) {
		let parent = parentPropMatches[1];

		return assertParentDefined(parent) + `typeof ${parent} !== "undefined" && `;
	} else {
		return "";
	}
}

module.exports = assertParentDefined;
