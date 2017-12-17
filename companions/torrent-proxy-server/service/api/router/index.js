const cancel = require('./routes/cancel');
const load = require('./routes/load');
const search = require('./routes/search');


/**
 * @type {Router}
 */
module.exports = class Router {
	/**
	 * @param {Object} expressApp
	 * @param {Object} torrentProxy
	 */
	constructor(expressApp, torrentProxy) {
		expressApp.get('/load/:magnet', (...args) => load(torrentProxy).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentProxy).get(...args));
		expressApp.get('/cancel/', (...args) => cancel(torrentProxy).get(...args));
	};
};
