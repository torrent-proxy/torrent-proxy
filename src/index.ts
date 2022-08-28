import API from './service/api';
import PopcornTimeApi from './service/external-api/popcorn-time';
import Transport from './service/api/transport';
import config from '../config';

const popcornTimeTransport = new Transport(config.externalApi.popcorn.url);
const popcornTimeApi = new PopcornTimeApi(popcornTimeTransport);

const api = new API(config.api, {
	popcornTimeApi: popcornTimeApi
});

const app: any = api.getApp();

export {
	app,
};
