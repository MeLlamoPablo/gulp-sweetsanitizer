"use strict";

module.exports = {
	// Matches any valid JSDoc comment.
	jsdoc: /(\/\*\*[\s\S]+?\*\/)/,

	// Matches all valid JSDoc comments.
	jsdocGlobal: /(\/\*\*[\s\S]+?\*\/)/g,

	// Matches any valid sweetSanitizer call.
	sweetSanitizerCall: /(sweetSanitizer(?:\(\)|\(([\s\S]+?|)\)))/,

	// Matches any property that has a parent object
	childrenProperty: /(.+)\.(.+)/
};
