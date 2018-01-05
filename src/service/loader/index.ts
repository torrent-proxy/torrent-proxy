import { ChildProcess } from 'child_process';
import { adapters, Manager } from 'tracker-proxy';
import { join as pathJoin } from 'path';
import { spawn } from 'child_process';

export default class TorrentProxyServer {
	private config: any;
	private trackerManager: Manager;
	private peerflix: ChildProcess | null;

	constructor(config) {
		this.peerflix = null;
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
					const peerflixBin = pathJoin('peerflix');
					this.peerflix = spawn('peerflix', ['--hostname', localIP, '--port', port, magnet]);
					this.peerflix.on('error', (err) => reject(err));

					let resolved = false;

					this.peerflix.stdout.on('data', () => {
						if (resolved) {
							return;
						}
						resolved = true;
						resolve('http://' + localIP + ':' + port);
					});

					this.peerflix.stderr.on('data', (err) => {
						if (err) {
							reject(err);
						}
					});
				});
		});
	}

	cancel(): Promise<void> {
		if (!this.peerflix) {
			return Promise.resolve();
		}

		this.peerflix.kill('SIGTERM');
		this.peerflix = null;

		return Promise.resolve();
	}
}
