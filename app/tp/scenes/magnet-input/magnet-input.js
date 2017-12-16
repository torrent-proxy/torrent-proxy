goog.provide('tp.scenes.MagnetInput');
goog.require('tp.scenes.templates.magnetInput.magnetInput');
goog.require('zb.layers.CuteScene');


/**
 */
tp.scenes.MagnetInput = class extends zb.layers.CuteScene {
	constructor() {
		super();

		/**
		 * @type {tp.scenes.templates.magnetInput.MagnetInputOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-magnet-input');
	}

	beforeDOMShow() {
		this._exported.input.setValue('dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c'.toUpperCase());
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.scenes.templates.magnetInput.magnetInput(this._getTemplateData(), this._getTemplateOptions());
	}
};
