import * as fs from 'fs';
import * as torrentStream from 'torrent-stream';
import {BTStream, createBTStream} from 'bt-stream'
let engine = null;
let torrent = null;



export default () => {
	return {
		get: (incomingMessage, res) => {
			const stream = fs.createReadStream('/home/oleg/downloads/vivaldi-stable_1.10.867.48-1_amd64.deb');
			return stream.pipe(res);
		},
		get2: (incomingMessage, res) => {
			const {filePath, magnet} = incomingMessage.params;
			console.log(magnet);
			engine = torrentStream(magnet);

			engine.on('ready', function () {
				const file = engine.files.find(function (file, i) {
					console.log('file:', file);
					return file.path === filePath;

					// const stream = file.createReadStream();
					// stream.pipe(res);
					// stream is readable stream to containing the file content
				});
				// const files = engine.files.map((file) => ({name: file.name, path: file.path}));

				const stream = file.createReadStream();
				stream.pipe(res);

				// console.log({files});
				// res.send({files});
			});
		},
		getMetadata: (incomingMessage, res) => {
			const magnet = decodeURIComponent(incomingMessage.originalUrl.substr('/getMetadata/'.length));
			console.log(`getMetadata`, {url: incomingMessage.originalUrl});
			console.log(`getMetadata`, {magnet});
			const btStream = createBTStream({dhtPort: Math.floor(Math.random() * 10000 + 1000), hash: magnet});

			console.log({magnet})
			return btStream.getMetaData(magnet)
				.then((_torrent) => {
					torrent = _torrent;
					console.log(`proxy:getMetadata`, {torrent});
					res.send({files: torrent.files.map((file) => ({name: file.name, path: file.path}))});
					btStream.destroy();
				})
				.catch((err) => console.error({err}));
		},
		download: (incomingMessage, res) => {
			console.log(`proxy:download`);
			const {filePath, magnet} = incomingMessage.params;
			console.log({filePath});
			console.log(incomingMessage.params.magnet);

			const btStream = createBTStream({dhtPort: Math.floor(Math.random() * 10000 + 1000), hash: magnet});

			console.log({magnet})
			console.log(`proxy:download:before_getMetaData`);
			return btStream.getMetaData(magnet)
				.then((torrent) => {
					console.log(`proxy:download:after_getMetaData`);
					const stream = btStream.downloadFileByPath({torrent, filePath});
					stream.pipe(res);
				});
		},
		downloadOld: (incomingMessage, res) => {
			console.log(incomingMessage.params.filePath);
			console.log(incomingMessage.params.magnet);

			const file = engine.files.find((file) => file.path === incomingMessage.params.filePath);
			const stream = file.createReadStream();
			stream.pipe(res);
		},
		get3: (incomingMessage, res) => {
			res.send(fs.readFileSync(__dirname + '/../../../../../../index.html'));
		}
	}
}


