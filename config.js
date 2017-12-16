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
		templateLocations: [
			path.join(__dirname, 'templates/tp/')
		],
		android: {
			namespace: 'tp',
			webViewDebug: true,
			name: 'Torrent Player',
			appId: process.env.npm_package_config_appId,
			launcherColor: '#181819',
			useBundledHTML: true,
			storeRelease: false,
			resPath: path.join(__dirname, 'res')
		}
	};
};
