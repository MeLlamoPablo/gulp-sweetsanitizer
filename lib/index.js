"use strict";

const callRegex                = require("./modules/regex").sweetSanitizerCall
	, generateSanitizeFunction = require("./modules/sanitize-fn-generator")
	, getFileCalls             = require("./modules/getFileCalls")
	, getFileTypedefs          = require("./modules/getFileTypedefs")
	, gutil                    = require("gulp-util")
	, parseJsdoc               = require("./modules/parseJsdoc")
	, through                  = require("through2");

const PluginError = gutil.PluginError;
const PLUGIN_NAME = "gulp-sweetsanitizer";

/**
 * Generates the sanitize functions on a file. Check the README.md for more information.
 * @param {string} file The file, in an utf-8 string.
 * @return {string} The file, with the sweetSanitizer() calls replaced.
 */
function generateSanitizeFunctions(file) {
	let calls = getFileCalls(file);
	let typeDefs = getFileTypedefs(file);

	let result = file;

	for (let call of calls) {
		let parsedComment = parseJsdoc(call.comment);
		let sanitizeFunction = generateSanitizeFunction(parsedComment, call.callOptions, typeDefs);

		/*
		 * Replace the call with the generated function
		 *
		 * To achieve that, we split the file into two pieces. The seconds begins with the call
		 * and ends with the end of file. The first is the rest.
		 *
		 * Matching the second piece against the sweetSanitizerCall regex will make sure to match
		 * the right call, since it is non-global. We replace it with the function, and replace
		 * the current file with the concatenation of the two pieces.
		 */
		let firstPiece = result.substr(0, call.callIndex);
		let secondPiece = result.substr(call.callIndex);

		secondPiece = secondPiece.replace(callRegex, sanitizeFunction);

		result = firstPiece + secondPiece;
	}

	return result;
}

module.exports = function sweetSanitizer() {
	return through.obj(function onFile(file, enc, cb) {

		if (file.isStream()) {
			let err = new PluginError(
				PLUGIN_NAME,
				"Sorry! Streams are not supported. Use Buffers instead"
			);

			this.emit("error", err);

			return cb(err);
		}

		if (file.isBuffer()) {
			let result;

			try {
				result = generateSanitizeFunctions(file.contents.toString("utf-8"));
			} catch (e) {
				this.emit("error", new PluginError(
					PLUGIN_NAME,
					e.message
				));

				return cb(e);
			}

			file.contents = new Buffer(result);
		}

		this.push(file);

		return cb();

	});
};
