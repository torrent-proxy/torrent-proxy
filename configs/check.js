/**
 * @return {Object}
 */
module.exports = () => {
	const testConfig = require('./test')();

	testConfig.compilation.flags.checks_only = true;

	return testConfig;
};
