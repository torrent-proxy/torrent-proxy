import ITorrentStream from './i-torrent-stream';

export default class TorrentStreamManager {
	private streams: {string: ITorrentStream} | {};
	
	constructor() {
		this.streams = {};
	}
	
	createTorrentStream(hash: string): ITorrentStream {
		// TODO: Нужна имплементация ITorrentStream
		// const newStream =  this.streams[hash] || new ITorrentStream(hash);
		const newStream =  this.streams[hash];
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
