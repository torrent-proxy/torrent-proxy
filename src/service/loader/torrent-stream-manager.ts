import ITorrentStream from './i-torrent-stream';

export default class TorrentStreamManager {
	private streams: {string: ITorrentStream} | {};
	
	constructor() {
		this.streams = {};
	}
	
	createTorrentStream(hash: string): ITorrentStream {
		const newStream =  this.streams[hash] || new ITorrentStream(hash);
		this.streams[hash] = newStream;

		return newStream;
	}

	destroyTorrentStream(hash: string): void {
		const torrentStream = this.streams[hash];
		if (!torrentStream) {
			return;
		}

		torrentStream.removeAllListeners();

		delete this.streams[hash];
	}
}
