import TorrentProxyServer from '../../../loader';
import IRoute from './i-route';

export default (torrentLoader: TorrentProxyServer): IRoute => {
	return {
		get: (incomingMessage, res) => {
			const magnet = decodeURIComponent(incomingMessage.originalUrl.substr('/load/'.length));
			return torrentLoader.loadMagnetInfo(magnet)
				.then((url) => res.send(url), (err) => {
					console.error(String(err));
					res.send(404);
				});
		}
	};
};
