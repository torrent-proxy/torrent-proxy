/**
 * @return {Object}
 */
module.exports = () => ({
	compilation: {
		flags: {
			define: [
				'ENVIRONMENT="prod"'
			]
		}
	}
});
