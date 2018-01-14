import TorrentProxyServer from '../../loader';
import PopcornTimeApi from '../../external-api/popcorn-time';
import cancel from './routes/cancel';
import load from './routes/load';
import popcornTimeRoute from './routes/popcorn-time';
import search from './routes/search';

export default class Router {
	constructor(expressApp: any, torrentProxy: TorrentProxyServer, popcornTimeApi: PopcornTimeApi) {
		expressApp.get('/load/:magnet', (...args) => load(torrentProxy).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentProxy).get(...args));
		expressApp.get('/cancel/', (...args) => cancel(torrentProxy).get(...args));
		expressApp.get('/category/', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).categories.get(incomingMessage, res));
		expressApp.get('/videos/:categoryId', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).videos.get(incomingMessage, res));
		expressApp.get('/video/:id', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).video.get(incomingMessage, res));
	};
};
