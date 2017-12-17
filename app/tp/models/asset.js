goog.provide('tp.models.Asset');


tp.models.Asset = class {
	/**
	 * @param {Object=} opt_data
	 */
	constructor(opt_data) {
		if (opt_data) {
			this.parse(opt_data);
		}
	}

	/**
	 * @param {Object} data
	 */
	parse(data) {
		/** @type {string} */
		this.title = data['title'];
		/** @type {string} */
		this.id = data['id'];
	}

	/**
	 * @param {Object=} opt_data
	 * @return {tp.models.Asset|*}
	 */
	static fromData(opt_data) {
		return new tp.models.Asset(opt_data);
	}

	/**
	 * @param {Array<Object>=} opt_arrayData
	 * @return {Array<tp.models.Asset>}
	 */
	static fromArrayData(opt_arrayData) {
		return (opt_arrayData || []).map(tp.models.Asset.fromData);
	}
}
