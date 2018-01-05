import TorrentProxyServer from '../../../loader';
import IRoute from './i-route';

export default (torrentApi: TorrentProxyServer): IRoute => {
	return {
		get: function(incomingMessage, res) {
			return torrentApi.search(incomingMessage.params.query)
				.then((collection) => res.send(collection), (err) => res.send(err));
		}
	};
};
