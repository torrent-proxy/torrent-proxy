/**
 * @return {Object}
 */
module.exports = () => ({
	compilation: {
		flags: {
			define: [
				'ENVIRONMENT="test"'
			]
		}
	}
});
