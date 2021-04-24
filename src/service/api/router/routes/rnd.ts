import {BTStream, createBTStream} from 'bt-stream'


export default () => {
	return {
		getMetadata: (incomingMessage, res) => {
			const magnet = decodeURIComponent(incomingMessage.originalUrl.substr('/getMetadata/'.length));
			console.log(`getMetadata`, {url: incomingMessage.originalUrl});
			console.log(`getMetadata`, {magnet});
			const btStream = createBTStream({dhtPort: Math.floor(Math.random() * 10000 + 1000), hash: magnet});

			console.log({magnet})
			return btStream.getMetaData(magnet)
				.then((torrent) => {
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
	}
}


