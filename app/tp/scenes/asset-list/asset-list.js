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

		app.service.torrent.search('mp4').then((assets) => {
			this._addAssets(assets);
		});

        this._exported.assetList.on(this._exported.assetList.EVENT_ACTIVATED_ITEM_CLICK, (event, item) => {
        	app.service.torrent.load(item).then((url) => {
                var player = app.getLayerManager().getLayer('player');
                player.play(url);
			});
        });
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
		this._exported.assetList.setItems(assets);
	}
};
