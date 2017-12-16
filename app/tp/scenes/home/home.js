goog.provide('tp.scenes.Home');
goog.require('tp.env');
goog.require('tp.scenes.templates.home.home');
goog.require('zb.layers.CuteScene');


/**
 */
tp.scenes.Home = class extends zb.layers.CuteScene {
	/**
	 */
	constructor () {
		super();

		/**
		 * @type {tp.scenes.templates.home.HomeOut}
		 * @protected
		*/
		this._templateResult;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.scenes.templates.home.home(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @override
	 * @return
	 */
	_getTemplateData() {
		return {
			envName: tp.env.getName()
		};
	}
};
