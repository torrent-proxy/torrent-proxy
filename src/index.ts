import API from './service/api';
import PopcornTimeApi from './service/external-api/popcorn-time';
import Transport from './service/api/transport';
import config from '../config';

const popcornTimeTransport = new Transport(config.externalApi.popcorn.url);
const popcornTimeApi = new PopcornTimeApi(popcornTimeTransport);

new API(config.api, {
	popcornTimeApi: popcornTimeApi
});
