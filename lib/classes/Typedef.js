"use strict";

/**
 * @class Typedef
 * @property {string} name The name of the type.
 * @property {Prop[]} properties The properties of the type.
 *
 * @typedef {object} Prop
 * @property {string} name The name of the property
 * @property {string} description The description of the property
 * @property {string} type The type of the property
 * @property {boolean} required Whether or not the property is required
 */
class Typedef {

	constructor(comment) {
		this.name = comment.tags.find(t => t.title === "typedef").name;
		this.properties = comment.tags.filter(t => t.title === "property").map(pTag => ({
			name: pTag.name,
			description: pTag.description,
			type: pTag.type,
			required: pTag.required
		}));
	}

}

module.exports = Typedef;
