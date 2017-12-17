goog.provide('tp.Application');
goog.require('tp.BaseApplication');
goog.require('tp.service.Torrent');
goog.require('tp.backend.config');


/**
 */
tp.Application = class extends tp.BaseApplication {
	/**
	 */
	constructor() {
		zb.console.setLevel(zb.console.Level.ALL);
		super();

		/**
		 * @type {{
		 *      torrent: tp.service.Torrent
		 * }}
		 */
		this.service = {
			torrent: new tp.service.Torrent('http://' + tp.backend.config.api.ip + ':' + tp.backend.config.api.port + '/')
		};
	}

	/**
	 * @override
	 */
	home() {
		this.clearHistory();
		// TODO: DEBUG ONLY
		const homeScene = this.getLayerManager().getLayer('player');
		return this.service.torrent
			.search('2004.DVD-RIP')
			.then((items) => {
				if (!items.length) {
					return;
				}
				const item = items[0];
				return this.service.torrent.load(item);
			})
			.then((url) => {
				return homeScene.play(url);
			});
	}

	/**
	 * @override
	 */
	onStart() {
		// login, splashscreen, timeout, etc.
		this.home();
	}
};
