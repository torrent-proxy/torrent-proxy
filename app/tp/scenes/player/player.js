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

	beforeDOMShow() {
		app.service.torrent
			.load('magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent')
			.then((file) => {
				const video = app.device.createVideo();
				console.log(video._video);

				file.renderTo(video._video);
			});
	}

    /**
     * @param {string} srcUrl
     */
	play(srcUrl) {
		const videoElement = this.getVideoElement();
		const srcNode = zb.html.node('source');
        srcNode.setAttribute('source', srcUrl);
		srcNode.setAttribute('type', 'video/mp4');
		console.log(videoElement);

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
