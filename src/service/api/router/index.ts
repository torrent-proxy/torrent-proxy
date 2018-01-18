import IProxy from '../../external-api/i-proxy';
import TorrentProxyServer from '../../loader';
import cancel from './routes/cancel';
import load from './routes/load';
import popcornTimeRoute from './routes/popcorn-time';
import search from './routes/search';

export default class Router {
	constructor(expressApp: any, torrentProxy: TorrentProxyServer, popcornTimeApi: IProxy) {
		expressApp.get('/load/:magnet', (...args) => load(torrentProxy).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentProxy).get(...args));
		expressApp.get('/cancel/', (...args) => cancel(torrentProxy).get(...args));

		expressApp.get('/animes/', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/anime/:id', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/movies/', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/movie/:id', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/shows/', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/show/:id', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
	};
};
