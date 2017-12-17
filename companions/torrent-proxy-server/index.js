const API = require('./service/api');
const TorrentProxy = require('./service/loader');
const googLoader = require('./load-goog-module');

const config = googLoader('../../app/tp/backend-config.js', 'tp.backend.config');
const torrentProxy = new TorrentProxy(config.torrentServer);

new API(config.api, {
	torrentProxy: torrentProxy
});
