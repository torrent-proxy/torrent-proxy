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
		return this.show('home', {});
	}

	/**
	 * @override
	 */
	onStart() {
		// login, splashscreen, timeout, etc.
		this.home();
	}
};
