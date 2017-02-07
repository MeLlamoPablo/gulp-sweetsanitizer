"use strict";

const File           = require("vinyl")
	, es             = require("event-stream")
	, fs             = require("fs")
	, sweetsanitizer = require("../lib");

const IN_DIR = "./test/mock/in/";
const OUT_DIR = "./test/mock/out/";

/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable no-extend-native */

describe("gulp-sweetsanitizer", () => {

	it("(a) Shouldn't error when given a file without comments.",
		() => test("a"));
	it("(b) Should parse primitive parameters.",
		() => test("b"));
	it("(c) Should uglify the output.",
		() => test("c"));
	it("(d) Should show machine readable errors (INVALID_TYPE_OR_PARAMETER_NOT_DEFINED).",
		() => test("d"));
	it("(e) Should parse documented objects with primitive parameters.",
		() => test("e"));
	it("(f) Should parse documented nested objects with primitive parameters.",
		() => test("f"));
	it("(g) Should parse documented objects with primitive and optional parameters.",
		() => test("g"));
	it("(h) Should make children properties of optional objects optional.",
		() => test("h"));
	it("(i) Should parse documented typedefs.",
		() => test("i"));
	it("(j) Should parse documented typedefs with optional properties.",
		() => test("j"));
	it("(k) Should parse documented optional typedefs.",
		() => test("k"));
	it("(l) Should default to using instanceof if no typedef is passed.",
		() => test("l"));
	it("(m) Should show machine readable errors (INVALID_TYPE AND PARAMETER_NOT_DEFINED).",
		() => test("m"));
	it("(n) Should assign default values to objects with properties with default values.",
		() => test("n"));
	it("(ñ) Should assign default values to nested objects with properties with default values.",
		() => test("ñ"));
	it("(o) Should parse nested objects with known and unknown typedefs.",
		() => test("o"));
	it("(p) Should work if the user doesn't put a semicolon after the sweetSanitizer() call.",
		() => test("p"));
	it("(q) Should work with multiple sweetSanitizer() calls.",
		() => test("q"));

	describe("error handling", () => {

		it("(a) Should error when given a stream instead of a buffer", () => {
			let writeToSsWithStreams = () => new Promise((fulfill, reject) => {

				try {
					let swSzInstance = sweetsanitizer();
					let mockFile = new File({
						contents: es.readArray(["mock", "data"])
					});

					swSzInstance.write(mockFile);

					swSzInstance.once("data", fulfill);
				} catch (e) {

					reject(e);

				}

			});

			return assertFails(writeToSsWithStreams());
		});
		it("(b) Should error when given two consecutive sweetSanitizer() calls " +
			"(the second without JSDoc comment).",
			() => assertFails(test("errorhandling/b")));
		it("(c) Should error when given a typedef with optional parameters.",
			() => assertFails(test("errorhandling/c")));

	});

});

function writeToSweetSanitizer(data) {
	return new Promise((fulfill, reject) => {

		try {
			let swSzInstance = sweetsanitizer();
			let mockFile = new File({
				contents: new Buffer(data, "utf-8")
			});

			swSzInstance.write(mockFile);

			swSzInstance.once("data", result => {
				if (!result.isBuffer) {
					reject(new Error("The result is not a buffer"));
				} else {
					fulfill(result.contents.toString("utf-8"));
				}
			});
		} catch (e) {

			reject(e);

		}

	});
}

function readFile(path) {
	return new Promise((fulfill, reject) => {
	    fs.readFile(path, "utf-8", (err, result) => {
	    	if (err) {
	    		reject(err);
			} else {
	    		fulfill(result);
			}
		});
	});
}

function readInAndOut(file) {
	return Promise.all([readFile(IN_DIR + file + ".js"), readFile(OUT_DIR + file + ".js")]);
}

function test(file) {
	return new Promise((fulfill, reject) => {
		readInAndOut(file).then(files => {
			let [input, expected] = files;

			writeToSweetSanitizer(input).then(output => {

				if (output
						.replace(/\n/g, "")
						.replace(/\t/g, "") ===
					expected
						.replace(/\n/g, "")
						.replace(/\t/g, "")) {
					fulfill();
				} else {
					let error = new Error(
						`The produced file and expected output don't match. (Test ${file})\n\n` +

						"=== INPUT FILE ===\n\n" + input + "\n\n" +
						"=== PRODUCED OUTPUT ===\n\n" + output +
						"=== EXPECTED OUTPUT ===\n\n" + expected);

					error.shouldMakeAssertFailsTestFailAsWell = true;
					reject(error);
				}

			}).catch(reject);
		}).catch(reject);
	});
}

function assertFails(testPromise, debug = false) {
	return new Promise((fulfill, reject) => {
		Promise.resolve(testPromise)
			.then(() => reject(new Error("Expected an error, but test didn't fail.")))
			.catch(err => {
				if (debug) {
					console.log(err);
				}

				if (!err.shouldMakeAssertFailsTestFailAsWell) {
					fulfill();
				} else {
					reject(new Error("Expected an error, but test failed only after the output " +
						"was generated.\n\n" +

						"Original error:\n" + err.message));
				}
			});
	});
}
