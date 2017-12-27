const API = require('./service/api');
const TorrentProxy = require('./service/loader');
const config = require('../config');

const torrentProxy = new TorrentProxy(config.torrentServer);

new API(config.api, {
	torrentProxy: torrentProxy
});
