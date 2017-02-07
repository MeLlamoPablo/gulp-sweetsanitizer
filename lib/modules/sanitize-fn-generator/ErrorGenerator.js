"use strict";

const sprintf = require("sprintf")
	, str     = require("./constants").str;

class ErrorGenerator {

	constructor (humanReadableError) {
		this.humanReadableError = !!humanReadableError;
	}

	paramNotDefined(param) {
		if (this.humanReadableError) {
			return ErrorGenerator._humanReadableError(sprintf(str.err_param_is_not_defined, param));
		} else {
			return ErrorGenerator._machineReadableError("PARAMETER_NOT_DEFINED", {
				parameter: param
			});
		}
	}

	invalidType(param, type) {
		if (this.humanReadableError) {
			return ErrorGenerator._humanReadableError(
				sprintf(str.err_invalid_type, param, type)
			);
		} else {
			return ErrorGenerator._machineReadableError("INVALID_TYPE", {
				parameter: param,
				expectedType: type
			});
		}
	}

	invalidTypeOrUndefined(param, type) {
		if (this.humanReadableError) {
			return ErrorGenerator._humanReadableError(
				sprintf(str.err_invalid_type_or_undefined, param, type)
			);
		} else {
			return ErrorGenerator._machineReadableError("INVALID_TYPE_OR_PARAMETER_NOT_DEFINED", {
				parameter: param,
				expectedType: type
			});
		}
	}

	static _humanReadableError(message) {
		return `new Error("${message}")`;
	}

	/**
	 * Generates a JSON string of the machine readable error to return.
	 * @param {string} reason Why the error occured.
	 * @param {object} [details] Additional information about the error.
	 * @return {string} The result string.
	 * @private
	 */
	static _machineReadableError(reason, details = {}) {
		return JSON.stringify({
			reason: reason,
			details: details
		});
	}

}

module.exports = ErrorGenerator;
