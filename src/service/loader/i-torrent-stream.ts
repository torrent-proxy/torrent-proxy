import {Readable} from 'stream';

export default interface ITorrentStream {
	constructor(hash: string)
	load(): Promise<MagnetInfo>
	createReadStream(): Readable
}

export interface MagnetInfo {
	info: {},
	files: File[]
}

export interface File {
	name: string,
	path: string,
	length: number
}
