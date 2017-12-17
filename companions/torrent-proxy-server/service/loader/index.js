const { adapters, Manager } = require('tracker-proxy');
const childProcess = require('child_process');
const path = require('path');


class TorrentProxyServer {
	constructor(config) {
		/**
		 * @type {Object}
		 * @private
		 */
		this._config = config;

		const manager = new Manager();
		manager.include(new adapters.TPB());

		this._trackerManager = manager;
		this._peerlix = null;
	}

	/**
	 * @param {string} query
	 * @return {Promise<>}
	 */
	search(query) {
		return new Promise((resolve, reject) => {
			this._trackerManager.search({ query: query });

			this._trackerManager.on(this._trackerManager.EVENT_SEARCH_RESPONSE, (tracker, torrents) => {
				const collection = torrents.map((torrent) => {
					return {
						title: torrent.title,
						magnet: torrent.magnet
					};
				});

				resolve(collection);
			});

			this._trackerManager.on(this._trackerManager.EVENT_SEARCH_ERROR, (tracker, err) => {
				reject(err);
			});
		});
	}

	/**
	 * @param {string} magnet
	 * @return {Promise}
	 */
	load(magnet) {
		return new Promise((resolve, reject) => {
			const localIP = this._config.ip;
			const port = this._config.port;
			const peerflixBin = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'peerflix');
			this._peerflix = childProcess.spawn(peerflixBin, ['--hostname', localIP, '--port', port, magnet]);

			let resolved = false;

			this._peerflix.stdout.on('data', () => {
				if (!resolved) {
					return;
				}
				resolved = true;
				resolve('http://' + localIP + ':' + port);
			});

			this._peerflix.stderr.on('data', (err) => {
				if (err) {
					reject(err);
				}
			});
		});
	}

	/**
	 * @return {void}
	 */
	cancel() {
		if (!this._peerlix) {
			return;
		}

		this._peerlix.kill('SIGTERM');
	}
}

module.exports = TorrentProxyServer;