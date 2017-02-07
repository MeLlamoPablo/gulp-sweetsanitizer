/* eslint-disable */
/**
 * Test
 * @param {options} options Test
 * @param {MyType} options.a Test
 * @param {WtfIsThisType} [options.b] Test
 */
function test(options) {
	var error = sweetSanitizer({ uglify: false });
}

/**
 * @typedef {object} MyType
 * @property {string} a A property
 * @property {number} b A property
 * @property {boolean} c A property
 * @property {MyType2} d A property
 * @property {MyType2} [e] A property
 */

/**
 * @typedef {object} MyType2
 * @property {string} aa A property
 * @property {number} bb A property
 * @property {boolean} cc A property
 */
