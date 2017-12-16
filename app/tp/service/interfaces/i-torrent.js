goog.provide('tp.service.ITorrent');



/**
 * @interface
 */
tp.service.ITorrent = class {
	/**
	 * @param {string} magnet
	 * @return {Promise<TorrentFile>}
	 */
	load(magnet) {}

	/**
	 * @param {string|TorrentFile} magnetOrTorrentFile
	 * @return {Promise<undefined>}
	 */
	cancel(magnetOrTorrentFile) {}
}
