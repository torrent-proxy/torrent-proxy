const Routes = require('./router');
const express = require('express');


/**
 * @type {API}
 */
module.exports = class API {
	/**
	 * @param {Object} config
	 * @param {{
	 *      torrentProxy: TorrentProxy
	 * }} deps
	 */
	constructor(config, deps) {
		/**
		 * @type {*}
		 * @private
		 */
		this._app = express();

		/**
		 * @type {Object}
		 * @private
		 */
		this._config = config;

		/**
		 * @type {Router}
		 * @private
		 */
		this._routes = new Routes(this._app, deps.torrentProxy);

		this._app.on('error', () => this._init());
		this._init();
	}

	/**
	 * @private
	 */
	_init() {
		this._app.listen(this._config.port, () => console.log(`Server started on ${this._config.port} port`))
	}
};
