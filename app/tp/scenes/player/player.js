goog.provide('tp.scenes.Player');
goog.require('tp.scenes.templates.player.player');
goog.require('zb.layers.CuteScene');


/**
 */
tp.scenes.Player = class extends zb.layers.CuteScene {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {tp.scenes.templates.player.PlayerOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-player');
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.scenes.templates.player.player(this._getTemplateData(), this._getTemplateOptions());
	}
};
