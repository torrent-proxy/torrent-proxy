var path = require('path');


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
		]
	};
};
