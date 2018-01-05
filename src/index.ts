import API from './service/api';
import TorrentProxy from './service/loader';
import config from '../config';

const torrentProxy = new TorrentProxy(config.torrentServer);

new API(config.api, {
	torrentProxy: torrentProxy
});
