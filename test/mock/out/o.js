/* eslint-disable */
/**
 * Test
 * @param {options} options Test
 * @param {MyType} options.a Test
 * @param {WtfIsThisType} [options.b] Test
 */
function test(options) {
	var error = (function(){if (typeof options === "undefined"
		&& typeof options === "function") {
		if (!(options instanceof options)) {
			return new Error("Parameter options is not of type options.");
		}
	} else {
		if ( typeof options === "undefined") {
			return new Error("Parameter options is not defined");
		}
	}if (typeof options !== "undefined" &&  typeof options.a === "undefined") {
		return new Error("Parameter options.a is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.a === "undefined") {
		return new Error("Parameter options.a.a is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.a !== "string") {
		return new Error("Parameter options.a.a is not defined, or is not of type string");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.b === "undefined") {
		return new Error("Parameter options.a.b is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.b !== "number") {
		return new Error("Parameter options.a.b is not defined, or is not of type number");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.c === "undefined") {
		return new Error("Parameter options.a.c is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.c !== "boolean") {
		return new Error("Parameter options.a.c is not defined, or is not of type boolean");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.d === "undefined") {
		return new Error("Parameter options.a.d is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.d === "undefined") {
		return new Error("Parameter options.a.d is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.aa === "undefined") {
		return new Error("Parameter options.a.d.aa is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.aa !== "string") {
		return new Error("Parameter options.a.d.aa is not defined, or is not of type string");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.bb === "undefined") {
		return new Error("Parameter options.a.d.bb is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.bb !== "number") {
		return new Error("Parameter options.a.d.bb is not defined, or is not of type number");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.cc === "undefined") {
		return new Error("Parameter options.a.d.cc is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.d !== "undefined" &&  typeof options.a.d.cc !== "boolean") {
		return new Error("Parameter options.a.d.cc is not defined, or is not of type boolean");
	}if (typeof options.a.e !== "undefined") {if (typeof options !== "undefined" && typeof options.a !== "undefined" &&  typeof options.a.e === "undefined") {
		return new Error("Parameter options.a.e is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.aa === "undefined") {
		return new Error("Parameter options.a.e.aa is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.aa !== "string") {
		return new Error("Parameter options.a.e.aa is not defined, or is not of type string");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.bb === "undefined") {
		return new Error("Parameter options.a.e.bb is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.bb !== "number") {
		return new Error("Parameter options.a.e.bb is not defined, or is not of type number");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.cc === "undefined") {
		return new Error("Parameter options.a.e.cc is not defined");
	}if (typeof options !== "undefined" && typeof options.a !== "undefined" && typeof options.a.e !== "undefined" &&  typeof options.a.e.cc !== "boolean") {
		return new Error("Parameter options.a.e.cc is not defined, or is not of type boolean");
	}}if (typeof options !== "undefined" &&  typeof options.b !== "undefined") {if (typeof options.b === "undefined"
		&& typeof WtfIsThisType === "function") {
		if (!(options.b instanceof WtfIsThisType)) {
			return new Error("Parameter options.b is not of type WtfIsThisType.");
		}
	} else {
		if (typeof options !== "undefined" &&  typeof options.b === "undefined") {
			return new Error("Parameter options.b is not defined");
		}
	}}return false;})();
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
