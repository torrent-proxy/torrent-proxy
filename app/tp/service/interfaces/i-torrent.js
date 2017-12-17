goog.provide('tp.service.ITorrent');
goog.require('tp.models.Asset');



/**
 * @interface
 */
tp.service.ITorrent = class {
	/**
	 * @param {string} query
	 * @return {Promise<Array<tp.models.Asset>>}
	 */
	search(query) {}

	/**
	 * @param {tp.models.Asset} asset
	 * @return {Promise<string>}
	 */
	load(asset) {}

	/**
	 * @param {tp.models.Asset} asset
	 */
	cancel(asset) {}
}
