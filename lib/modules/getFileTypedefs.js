"use strict";

const Typedef    = require("../classes/Typedef")
	, parseJsdoc = require("./parseJsdoc")
	, regex      = require("./regex").jsdocGlobal;

/**
 * Determines whether or not a comment is a typedef comment.
 * @param {object} comment The comment, parsed by parseJsdoc
 * @returns {boolean} This is obvious, but eslint still wants me to comment the obvious.
 */
function isTypedefComment(comment) {
	for (let tag of comment.tags) {
		if (tag.title === "typedef") {
			return true;
		}
	}

	return false;
}

/**
 * Finds all the comments with @typedef in a file, and returns them.
 * @param {string} content The file's content, in an utf-8 string.
 * @return {Typedef[]} An array containing all the Typedefs found in the file.
 */
function getFileTypedefs(content) {
	let matches = content.match(regex);
	let comments = [];

	if (matches !== null) {
		for (let comment of matches) {
			comments.push(parseJsdoc(comment));
		}

		let typedefComments = comments.filter(isTypedefComment);
		let typedefs = [];

		for (let typedefComment of typedefComments) {
			typedefs.push(new Typedef(typedefComment));
		}

		return typedefs;
	} else {
		return [];
	}

}

module.exports = getFileTypedefs;
