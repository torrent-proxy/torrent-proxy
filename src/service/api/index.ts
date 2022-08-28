import Routes from './router';
import * as express from 'express';
import { EventEmitter } from 'events';
import PopcornTimeApi from '../external-api/popcorn-time';

export default class API extends EventEmitter {
	private app: express.Application;
	private config: any;
	private routes: Routes;

	constructor(config: any, deps: {popcornTimeApi: PopcornTimeApi}) {
		super();

		this.app = express();
		this.app.use('/example', express.static(__dirname + '/../../../../example'));
		this.app.use(express.static(__dirname + '/../../../../web-app/public'));
		this.config = config;
		this.routes = new Routes(this.app, deps.popcornTimeApi);

		// TODO: Find method use on/off methods
		// this.app.on('error', () => this._init());

		this._init();
	}

	getApp() {
		return this.app;
	}

	private _init() {
		this.app.listen(this.config.port, () => console.log(`Server started on ${this.config.port} port`));
	}
};
