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

		/**
		 * @type {tp.scenes.templates.player.PlayerOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-player');
	}

    /**
     * @param {string} srcUrl
     */
	play(srcUrl) {
		const videoElement = this.getVideoElement();
		const srcNode = zb.html.node('source');
		srcNode.setAttribute('src', srcUrl);
		srcNode.setAttribute('type', 'video/mp4');

		videoElement.appendChild(srcNode);
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
