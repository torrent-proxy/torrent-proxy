goog.provide('tp.service.Torrent');
goog.require('tp.models.Asset');
goog.require('tp.service.ITorrent');


/**
 * @implements {tp.service.ITorrent}
 */
tp.service.Torrent = class {
	constructor(torrentProxyUrl) {
		/**
		 * @type {string}
		 * @private
		 */
		this._torrentProxyUrl = torrentProxyUrl;
	}

	/**
	 * @param {string} query
	 * @return {Promise<tp.models>}
	 * @override
	 */
	search(query) {
		return fetch(this._torrentProxyUrl + 'search/' + query)
			.then((response) => response.json())
			.then(tp.models.Asset.fromArrayData);
	}

	/**
	 * @override
	 */
	load(asset) {
		return fetch(this._torrentProxyUrl + 'load/' + asset.id)
			.then((response) => response.json())
			.then((result) => {
				return result['url'];
			});
	}

	/**
	 * @override
	 */
	cancel(asset) {
		return fetch(this._torrentProxyUrl + 'cancel/' + asset.id)
			.then((response) => response.json())
			.then((result) => result['success']);
	}
}
