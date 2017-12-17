const { adapters, Manager } = require('tracker-proxy');
const { spawn } = require('child_process');

class TorrentProxyServer {
	constructor() {
		const manager = new Manager();
		manager.include(new adapters.TPB());

		this._trackerManager = manager;
		this._peerlix = null;
	}

	/**
	 * @params {string} query
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
		const path = require('path');
		const localIP = this._getLocalIP();
		const port = '8888';
		const peerflixBin = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'peerflix');
		this._peerflix = spawn(peerflixBin, ['--hostname', localIP, '--port', port, magnet]);

		return new Promise((resolve, reject) => {
			this._peerflix.stdout.on('data', () => {
			   resolve({
				   hostname: localIP,
				   port: port,
				   url: 'http://' + localIP + ':' + port
			   });
			});

			this._peerflix.stderr.on('data', (data) => {
			   reject(data);
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

	/**
	 * @return {string}
	 * @private
	 */
	_getLocalIP() {
		const os = require('os');
		const ifaces = os.networkInterfaces();

		let ip = '127.0.0.1';
		Object.keys(ifaces).forEach((ifname) => {
			ifaces[ifname].forEach((iface) => {
				if ('IPv4' !== iface.family || iface.internal !== false) {
					return;
				}

				if (iface.address) {
					ip = iface.address;
				}
			});
		});

		return ip;
	}
}

module.exports = TorrentProxyServer;