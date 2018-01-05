import TorrentProxyServer from '../../loader';
import cancel from './routes/cancel';
import load from './routes/load';
import search from './routes/search';

export default class Router {
	/**
	 * @param {Object} expressApp
	 * @param {Object} torrentProxy
	 */
	constructor(expressApp: any, torrentProxy: TorrentProxyServer) {
		expressApp.get('/load/:magnet', (...args) => load(torrentProxy).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentProxy).get(...args));
		expressApp.get('/cancel/', (...args) => cancel(torrentProxy).get(...args));
	};
};
