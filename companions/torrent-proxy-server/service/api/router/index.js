const cancel = require('./routes/cancel');
const load = require('./routes/load');
const search = require('./routes/search');


/**
 * @type {Router}
 */
module.exports = class Router {
	/**
	 * @param {Object} expressApp
	 * @param {Object} torrentLoader
	 * @param {Object} torrentApi
	 */
	constructor(expressApp, torrentLoader, torrentApi) {
		expressApp.get('/load/:magnet', (...args) => load(torrentLoader).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentApi).get(...args));
		expressApp.get('/cancel/:magnet', (...args) => cancel(torrentLoader).get(...args));
	};
};
