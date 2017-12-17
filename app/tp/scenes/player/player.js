goog.provide('tp.scenes.Player');
goog.require('tp.scenes.templates.player.player');
goog.require('zb.layers.CuteScene');


/**
 */
tp.scenes.Player = class extends zb.layers.CuteScene {
	/**
	 * @param {string}
	 */
	constructor(input) {
		super();

		this._video = null;
		/**
		 * @type {tp.scenes.templates.player.PlayerOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-player');

		this.activateWidget(this._exported.playPause);
	}

	beforeDOMShow() {}

    /**
     * @param {string} url
     */
	play(url) {
	    app.getSceneOpener().open(this, () => {
	    	if (this._video) {
	    		this._video.stop();
	    	} else {
	    		this._video = app.device.createVideo();
		    }

		    this._exported.playPause.setPlayer(this._video);
		    this._video.play(url);
	    });
    }

    /**
     * @return {HTMLVideoElement}
     */
	getVideoElement() {
		return this._exported.video;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return tp.scenes.templates.player.player(this._getTemplateData(), this._getTemplateOptions());
	}
};
