goog.provide('tp.Application');
goog.require('tp.BaseApplication');


/**
 */
tp.Application = class extends tp.BaseApplication {
	/**
	 */
	constructor() {
		zb.console.setLevel(zb.console.Level.ALL);
		super();
	}

	/**
	 * @override
	 */
	home() {
		this.clearHistory();
		const homeScene = this.getLayerManager().getLayer('magnet-input');

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
