const path = require('path');


/**
 * @param {Object} config
 * @return {Object}
 */
module.exports = function(config) {
	return {
		appNamespace: 'tp',
		scripts: [
			// 'script.js'
		],
		styles: [
			//'myStyle.css'
		],
		modules: [
			//'some-nodejs-zb-module'
		],
		services: {
			// manual services config
		},
		servicesAutodetect: [
			'scenes',
			'service'
		],
		android: {
			namespace: 'tp',
			webViewDebug: true,
			name: 'Torrent Player',
			appId: 'ru.interfaced.tp',
			launcherColor: '#181819',
			useBundledHTML: true,
			storeRelease: false,
			resPath: path.join(__dirname, 'res')
		}
	};
};
