import * as fs from 'fs';
import * as torrentStream from 'torrent-stream';
import {promisify} from 'util';

const BTStream = require('bt-stream');
const magnetURIDecode = require('magnet-uri');

const fsStat = promisify(fs.stat);
const fsMkdir = promisify(fs.mkdir);

let engine = null;

export default () => {
	return {
		get: (incomingMessage, res) => {
			const stream = fs.createReadStream('/home/oleg/downloads/vivaldi-stable_1.10.867.48-1_amd64.deb');
			return stream.pipe(res);
		},
		get2: (incomingMessage, res) => {
			const magnet = decodeURIComponent(incomingMessage.originalUrl.substr('/load/'.length));
			console.log(magnet);
			engine = torrentStream(magnet);

			engine.on('ready', function () {
				engine.files.forEach(function (file, i) {
					console.log('file:', file);

					// const stream = file.createReadStream();
					// stream.pipe(res);
					// stream is readable stream to containing the file content
				});
				res.send({files: engine.files.map((file) => ({name: file.name, path: file.path}))});
			});

		},
		download: (incomingMessage, res) => {
			console.log(incomingMessage.params.filePath);
			console.log(incomingMessage.params.magnet);

			const file = engine.files.find((file) => file.path === incomingMessage.params.filePath);
			const stream = file.createReadStream();
			stream.pipe(res);
		},
		downloadWithBTFS: (incomingMessage, res) => {
			const {filePath, magnet} = incomingMessage.params;
			const hash = magnetURIDecode(magnet).infoHash;
			const mountPoint = join(`/Users/oleg/mounts/`, hash);

			console.log({filePath, magnet});

			return fsStat(mountPoint)
				.catch((err) => {
					if (err.code === `ENOENT`) {
						return fsMkdir(mountPoint);
					} else if(err.code === `EEXIST`) {
						// TODO: hz
					}
				})
				.then(() => mount({magnet, mountPoint}))
				.then(() => {
					const p = join(mountPoint, filePath);
					console.log({path: p});

					const stream = fs.createReadStream(p);
					stream.pipe(res);
				})
				.catch((err) => {
					console.error({err});
					process.exit(1);
				});
		},
		get3: (incomingMessage, res) => {
			res.send(fs.readFileSync(__dirname + '/../../../../../../index.html'));
		}
	}
}


