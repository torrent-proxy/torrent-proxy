const API = require('./service/api');
const config = require('./config');

new API(config.api, {
	torrentApi: {},
	torrentLoader: {}
});
