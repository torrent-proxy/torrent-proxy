import { adapters, Manager } from 'tracker-proxy';
import { HLSServer, BittorrentStreamProviderBuilder } from 'http-streaming-server';
import * as TorrentStream from 'torrent-stream';
import { getType as getMimeType } from 'mime';
import * as http from 'http';

export default class TorrentProxyServer {
	private config: any;
	private trackerManager: Manager;
	private server: http.Server | null;

	constructor(config) {
		this.server = null;
		this.config = config;

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

	load(magnet: string): Promise<string> {
		console.log(magnet)
		return new Promise((resolve, reject) => {
			return this.cancel()
				.then(() => {
					const localIP = this.config.ip;
					const port = this.config.port;

					const torrentStreamEngine = TorrentStream(magnet);
					const server = http.createServer();

					server.once('error', (err) => {
						reject(err);
					});

					server.once('listening', () => {
						const address = server.address();

						resolve(`http://${address.address}:${address.port}/`);
					});

					const provider = new BittorrentStreamProviderBuilder()
						.withFilter((file) => {
							const regex = /^video\//g;
							const mimeType = getMimeType(file.name);

							return regex.test(mimeType);
						})
						.build(torrentStreamEngine);

					const hlsMiddleware = new HLSServer(server, { provider });

					server.listen(port, localIP);
					this.server = server;
				});
		});
	}

	cancel(): Promise<void> {
		if (!this.server) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			this.server.close((reason) => {
				this.server = null;

				resolve(reason);
			});
		});
	}
}
