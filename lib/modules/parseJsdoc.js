"use strict";

const doctrine = require("doctrine");

/**
 * This function calls doctrine and modifies its output to make it more understandable.
 *
 * @param {string} jsdocComment
 *
 * A string with a single jsdoc comment, beginning with (slash wildcard wildcard) and ending
 * with (wildcard slash).
 *
 * @returns {object}
 *
 * A modified doctrine output, where tag.type is a string containing the tag type, and tags
 * may contain the tag.required boolean attribute.
 */
function parseJsdoc(jsdocComment) {
	let parsed = doctrine.parse(jsdocComment, { unwrap: true, sloppy: true });

	for (let tag of parsed.tags) {

		if (tag.type) {

			if (tag.type.type === "NameExpression") {

				tag.required = true;
				tag.type = tag.type.name;

			} else if (tag.type.type === "OptionalType") {

				tag.required = false;
				tag.type = tag.type.expression.name;

			}

		}
	}

	return parsed;
}

module.exports = parseJsdoc;
