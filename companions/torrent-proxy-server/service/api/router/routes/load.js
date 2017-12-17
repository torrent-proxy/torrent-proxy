/**
 * @param {Object} torrentLoader
 * @return {{
 *      get: function(): Promise
 * }}
 */
module.exports = (torrentLoader) => {
	return {
		get: function(incomingMessage, res) {
			return torrentLoader.load(incomingMessage.originalUrl.substr('/load/'.length))
				.then((url) => res.send(url), (err) => res.send(err));
		}
	};
};