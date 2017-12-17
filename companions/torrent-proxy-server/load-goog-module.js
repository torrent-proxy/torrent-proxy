const initNodeGoog = require('./node-goog');


/**
 * @param {string} path
 * @param {string} namespace
 * @return {Object}
 */
function loadGoogModule(path, namespace) {
	initNodeGoog();
	require(path);

	return namespace.split('.')
		.reduce((prev, name) => {
			return prev[name];
		}, global);
}


/**
 * @type {loadGoogModule}
 */
module.exports = loadGoogModule;
