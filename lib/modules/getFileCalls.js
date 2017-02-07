"use strict";

const JSON5 = require("json5")
	, regex = require("./regex");

/**
 * @typedef {object} SweetSanitizerCall
 * @property {string} comment
 *
 * The comment corresponding to the call, as a raw string.
 *
 * @property {number} callIndex
 *
 * The index corresponding to the call's location in the whole file.
 *
 * @property {object} callOptions
 *
 * The options passed to sweetSanitizer.
 */

/**
 * Analyzes a file, and returns all sweetSanitizer calls with their corresponding comments.
 * @param {string} content The file's content, in an utf-8 string.
 * @returns {SweetSanitizerCall[]} An array containing every call.
 */
function getFileCalls(content) {
	// We don't want to modify "content". We create a variable "ourContent" so we can tamper
	// with the user content, while keeping the original "content" intact.
	let ourContent = content;

	/*
	 * First we need to get all jsdoc comments and their positions.
	 */

	let jsdocComments = [];

	/* eslint-disable no-cond-assign */
	// Match all jsdoc comments by running the regex and removing the comment from ourContent
	// until we run out of comment.
	// We could use the //g modifier, but that doesn't give us the comment indexes.
	for (let matches, removedChars = 0; matches = ourContent.match(regex.jsdoc);) {
		jsdocComments.push({
			content: matches[1],
			index: matches.index + removedChars
		});

		ourContent = ourContent.replace(matches[1], "");

		// By removing content form ourContent, we are also manipulationg the true indexes
		// We compensate that by adding the removec portion's length to removedChars.
		removedChars += matches[1].length;
	}
	/* eslint-enable no-cond-assign */

	/*
	 * Then we need to get all sweetSanitizer() calls and their positions.
	 */

	ourContent = content;
	let sweetSanitizerCalls = [];

	/* eslint-disable no-cond-assign */
	for (let matches, removedChars = 0; matches = ourContent.match(regex.sweetSanitizerCall);) {
		sweetSanitizerCalls.push({
			content: matches[1],
			options: matches[2] || null,
			index: matches.index + removedChars
		});

		let chars = [];
		for (let i = 0; i < matches[1].length; i++) {
			let char = matches[1].charAt(i);
			chars.push(char);
		}

		ourContent = ourContent.replace(matches[1], "");
		removedChars += matches[1].length;
	}
	/* eslint-enable no-cond-assign */

	/*
	 * Now that we have both, we can associate each call with each function.
	 *
	 * The way to do that is creating an array ordered by indexes, and keeping the calls
	 * preceded by comments. For instance:
	 *
	 * JSDoc - JSDoc - Call - JSDoc - JSDoc - Call - JSDoc
	 *
	 * We keep comment two and comment four, and discard the rest.
	 */

	let items = []; // Array with calls and comments.

	for (let comment of jsdocComments) {
		items.push({
			type: "comment",
			content: comment.content,
			index: comment.index
		});
	}

	for (let call of sweetSanitizerCalls) {
		let json5ed;

		try {
			json5ed = JSON5.parse(call.options || "{}");
		} catch (e) /* eslint-disable no-empty*/{
			// For some reason, JSON5 throws an "Unexpected character EOL" error, yet it
			// still works completely fine when the error throwing line is commented out.
			//
			// So we simply ignore the error.
		}
		/* eslint-enable no-empty*/

		items.push({
			type: "call",
			index: call.index,
			options: json5ed
		});
	}

	items = items.sort((a, b) => a.index - b.index);

	let usefulComments = [];

	for (let i = 0; i < items.length; i++) {
		let item = items[i];

		if (item.type === "call") {
			if (items[i - 1] && items[i - 1].type === "call") {
				throw new Error("Found two consecutive sweetSanitizer calls.\n" +
					"This means that the second doesn't have a preceding JSDoc comment.");
			} else {
				if (items[i - 1] && items[i - 1].type === "comment") {
					usefulComments.push({
						comment: items[i - 1].content,
						callIndex: item.index,
						callOptions: item.options
					});
				} else {
					throw new Error("Found a sweetSanitizerCall without a preceding " +
						"JSDoc comment.");
				}
			}
		}
	}

	return usefulComments;
}

module.exports = getFileCalls;
