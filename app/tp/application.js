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
		const homeScene = this.getLayerManager().getLayer('asset-list');

        this.getSceneOpener().open(homeScene, () => {
            return;
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
