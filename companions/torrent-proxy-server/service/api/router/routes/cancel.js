/**
 * @param {Object} torrentLoader
 * @return {{
 *      get: function(): Promise
 * }}
 */
module.exports = (torrentLoader) => {
	return {
		get: function(incomingMessage, res) {
			return torrentLoader.cancel()
				.then((collection) => res.send(collection), (err) => res.send(err));
		}
	};
};