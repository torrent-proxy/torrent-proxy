goog.provide('tp.Application');
goog.require('tp.BaseApplication');
goog.require('tp.service.Torrent');


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
			torrent: new tp.service.Torrent()
		};
	}

	/**
	 * @override
	 */
	home() {
		this.clearHistory();
		// TODO: DEBUG ONLY
		const homeScene = this.getLayerManager().getLayer('player');

		return this.getSceneOpener().open(homeScene, () => {
			// Set home scene data here
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
