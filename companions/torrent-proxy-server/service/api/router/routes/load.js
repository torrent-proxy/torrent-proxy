/**
 * @param {Object} torrentLoader
 * @return {{
 *      get: function(): Promise
 * }}
 */
module.exports = (torrentLoader) => {
	return {
		get: function(incomingMessage, res) {
			return torrentLoader.load(incomingMessage.params.id);

		}
	};
};