import IProxy from '../../external-api/i-proxy';
import popcornTimeRoute from './routes/popcorn-time';
import rnd from './routes/rnd';
import {router as rutorRouter} from '../routes/rutor';

export default class Router {
	constructor(expressApp: any, popcornTimeApi: IProxy) {
		expressApp.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
		expressApp.get('/api/popcorn/*', (incomingMessage, res) => popcornTimeRoute(popcornTimeApi).get(incomingMessage, res));
		expressApp.get('/api/getMetadata/:magnet', (incomingMessage, res) => rnd().getMetadata(incomingMessage, res));
		expressApp.get('/api/download/:magnet/:filePath', (incomingMessage, res) => rnd().download(incomingMessage, res));

		expressApp.use('/api/rutor', rutorRouter);
	};
};
