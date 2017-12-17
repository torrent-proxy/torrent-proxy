/**
 * @param {Object} torrentApi
 * @return {{
 *      get: function(): Promise
 * }}
 */
module.exports = (torrentApi) => {
	return {
		get: function(incomingMessage, res) {
			return torrentApi.search(incomingMessage.params.query)
				.then((collection) => res.send(collection), (err) => res.send(err));
		}
	};
};
