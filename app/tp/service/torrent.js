goog.provide('tp.service.Torrent');
goog.require('tp.service.ITorrent');


/**
 * @implements {tp.service.ITorrent}
 */
tp.service.Torrent = class {
	constructor() {
		/**
		 * @type {WebTorrent.Instance}
		 * @private
		 */
		this._webTorrent = new window.WebTorrent();

		/**
		 * @type {Object<string, WebTorrent.Torrent>}
		 * @private
		 */
		this._map = {};

		// const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
	}

	/**
	 * @override
	 */
	load(magnet) {
		return new Promise((resolve, reject) => {
			this._webTorrent.add(magnet, (torrent) => {
				this._map[magnet] = torrent;

				const file = this._findTargetTorrentFile(torrent);

				if (file) {
					resolve(file);
				} else {
					reject('*.mp4 file not found');
				}
			});
		});
	}

	/**
	 * @override
	 */
	cancel(magnetOrTorrentFile) {
		let torrent = null;
		return new Promise((resolve, reject) => {
			if (typeof magnetOrTorrentFile === 'string') {
				torrent = this._map[magnetOrTorrentFile];
			} else {
				const torrentFile = magnetOrTorrentFile;
				torrent = Object.values(this._map).find((torrent) => {
					return torrentFile === this._findTargetTorrentFile(torrent);
				}) || null;
			}

			if (!torrent) {
				reject('cancel: not found target');
			}

			torrent.destroy((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	/**
	 * @param {WebTorrent.Torrent} torrent
	 * @return {?TorrentFile}
	 * @private
	 */
	_findTargetTorrentFile(torrent) {
		return torrent.files.find((file) => {
			return file.name.endsWith('.mp4');
		}) || null;
	}
}
