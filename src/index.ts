import API from './service/api';
import PopcornTimeApi from './service/external-api/popcorn-time';
import TorrentProxy from './service/loader';
import Transport from './service/api/transport';
import config from '../config';

const popcornTimeTransport = new Transport(config.externalApi.popcorn.url);
const popcornTimeApi = new PopcornTimeApi(popcornTimeTransport);
const torrentProxy = new TorrentProxy(config.torrentServer);

new API(config.api, {
	torrentProxy: torrentProxy,
	popcornTimeApi: popcornTimeApi
});
