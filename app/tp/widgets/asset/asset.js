goog.provide('tp.widgets.Asset');
goog.require('tp.widgets.templates.asset.asset');
goog.require('tp.models.Asset');
goog.require('zb.widgets.CuteWidget');


/**
 */
tp.widgets.Asset = class extends zb.widgets.CuteWidget {
	/**
	 * @param {tp.models.Asset} params
	 */
	constructor(params) {
		super();

		/**
		 * @type {tp.widgets.templates.asset.AssetOut}
		 * @protected
		 */
		this._exported;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.widgets.templates.asset.asset(this._getTemplateData(), this._getTemplateOptions());
	}
};
