import { adapters, Manager } from 'tracker-proxy';
import { File, MagnetInfo } from './i-torrent-stream';
import TorrentStreamManager from './torrent-stream-manager';

export default class TorrentProxyServer {
	private config: any;
	private torrentStreamManager: TorrentStreamManager;
	private trackerManager: Manager;

	constructor(config) {
		this.config = config;

		this.torrentStreamManager = new TorrentStreamManager();
		this.trackerManager = new Manager();

		this.trackerManager.include(new adapters.TPB());
	}

	search(query: string): Promise<{title: string, magnet: string}[]> {
		return new Promise((resolve, reject) => {
			this.trackerManager.search({ query: query });

			this.trackerManager.on(this.trackerManager.EVENT_SEARCH_RESPONSE, (tracker, torrents) => {
				const collection = torrents.map((torrent) => {
					return {
						title: torrent.title,
						magnet: torrent.magnet
					};
				});

				resolve(collection);
			});

			this.trackerManager.on(this.trackerManager.EVENT_SEARCH_ERROR, (tracker, err) => {
				reject(err);
			});
		});
	}

	loadMagnetInfo(magnet: string): Promise<MagnetInfo> {
		// TODO: Получить hash из magnet
		const hash = magnet;

		const torrentStream = this.torrentStreamManager.createTorrentStream(hash);
		return torrentStream.load();
	}

	// TODO: что использовать? Объект file или magnet и filePath?
	downloadFile(file: File) {

	}
}
