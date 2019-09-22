import IProxy from '../../external-api/i-proxy';
import TorrentProxyServer from '../../loader';
import load from './routes/load';
import popcornTimeRoute from './routes/popcorn-time';
import rnd from './routes/rnd';
import search from './routes/search';

export default class Router {
	constructor(expressApp: any, torrentProxy: TorrentProxyServer, popcornTimeApi: IProxy) {
		expressApp.get('/load/:magnet', (...args) => load(torrentProxy).get(...args));
		expressApp.get('/search/:query', (...args) => search(torrentProxy).get(...args));
		expressApp.get('/popcorn/*', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/rnd/', (incomingMessage, res) => rnd().get(incomingMessage, res));
		expressApp.get('/rnd2/:magnet', (incomingMessage, res) => rnd().get2(incomingMessage, res));
		expressApp.get('/download/:magnet/:filePath', (incomingMessage, res) => rnd().download(incomingMessage, res));
		expressApp.get('/rnd3/', (incomingMessage, res) => rnd().get3(incomingMessage, res));
	};
};
