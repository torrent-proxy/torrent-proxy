import API from './service/api';
import TorrentProxy from './service/loader';
import PopcornTimeApi from './service/external-api/popcorn-time';
import config from '../config';

const popcornTimeApi = new PopcornTimeApi('https://tv-v2.api-fetch.website/');
const torrentProxy = new TorrentProxy(config.torrentServer);

new API(config.api, {
	torrentProxy: torrentProxy,
	popcornTimeApi: popcornTimeApi
});
