goog.provide('tp.scenes.AssetList');
goog.require('tp.scenes.templates.assetList.assetList');
goog.require('tp.widgets.Asset');
goog.require('zb.layers.CuteScene');


/**
 */
tp.scenes.AssetList = class extends zb.layers.CuteScene {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {tp.scenes.templates.assetList.AssetListOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-asset-list');

		// TODO: DEBUG ONLY
		this._addAssets([{
			title: 123,
			magnet: 123
		}, {
			title: 123,
			magnet: 123
		}, {
			title: 123,
			magnet: 123
		}]);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.scenes.templates.assetList.assetList(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @param {Array<tp.models.Asset>} assets
	 * @private
	 */
	_addAssets(assets) {
		assets.forEach((asset) => this._addAsset(asset));
	}

	/**
	 * @param {tp.models.Asset} asset
	 * @private
	 */
	_addAsset(asset) {
		const assetWidget = new tp.widgets.Asset(asset);
		this.appendWidget(assetWidget);
		this._exported.assets.appendChild(assetWidget.getContainer());

	}
};
