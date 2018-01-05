import TorrentProxyServer from '../../../loader';
import IRoute from './i-route';

export default (torrentLoader: TorrentProxyServer): IRoute => {
	return {
		get: function(incomingMessage, res) {
			return torrentLoader.cancel()
				.then((collection) => res.send(collection), (err) => res.send(err));
		}
	};
};
