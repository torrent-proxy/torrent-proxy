import {BTStream, createBTStream} from 'bt-stream'
import * as parseRange from 'range-parser';


const contentRange = (type, size, range) => {
  	const result = `${type} ${range ? range.start + '-' + range.end : '*'}/${size}`;

  	console.log('contentRange::args', type, size, range);
  	console.log('contentRange::result', result);
	return result;
};

let btStream_ = null;

const parseByteRange = function (req, stat) {
	var byteRange = {
		from: 0,
		to: 0,
		valid: false
	};

	var rangeHeader = req.headers['range'];
	var flavor = 'bytes=';

	if (rangeHeader) {
		if (rangeHeader.indexOf(flavor) == 0 && rangeHeader.indexOf(',') == -1) {
			/* Parse */
			rangeHeader = rangeHeader.substr(flavor.length).split('-');
			byteRange.from = parseInt(rangeHeader[0]);
			byteRange.to = parseInt(rangeHeader[1]);

			/* Replace empty fields of differential requests by absolute values */
			if (isNaN(byteRange.from) && !isNaN(byteRange.to)) {
				byteRange.from = stat.size - byteRange.to;
				byteRange.to = stat.size ? stat.size - 1 : 0;
			} else if (!isNaN(byteRange.from) && isNaN(byteRange.to)) {
				byteRange.to = stat.size ? stat.size - 1 : 0;
			}

			/* General byte range validation */
			if (!isNaN(byteRange.from) && !!byteRange.to && 0 <= byteRange.from && byteRange.from < byteRange.to) {
				byteRange.valid = true;
			} else {
				console.warn("Request contains invalid range header: ", rangeHeader);
			}
		} else {
			console.warn("Request contains unsupported range header: ", rangeHeader);
		}
	}

	console.log(req.headers['range'])
	console.log({byteRange})
	return byteRange;
};

const getMetadata = async (magnet) => {
	const btStream = createBTStream({
		dhtPort: Math.floor(Math.random() * 10000 + 1000),
		hash: magnet,
	});

	return await btStream.getMetaData(magnet);
};

export {
	btStream_,
}

export default () => {
	const o = {
		getMetadata: (incomingMessage, res) => {
			const {magnet} = incomingMessage.params;
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
			return o._download(incomingMessage, res);

			console.log(`proxy:download`);
			const {filePath, magnet} = incomingMessage.params;
			console.log({filePath});
			console.log(incomingMessage.params.magnet);

			const btStream = createBTStream({dhtPort: Math.floor(Math.random() * 10000 + 1000), hash: magnet});
			btStream_ = btStream;

			console.log({magnet})
			console.log(`proxy:download:before_getMetaData`);
			return btStream.getMetaData(magnet)
				.then((torrent) => {
					console.log(`proxy:download:after_getMetaData`);
					const stream = btStream.downloadFileByPath({torrent, filePath, offset: 0});
					stream.pipe(res);
				});
		},
		_download: async (incomingMessage, res) => {
			return o.d(incomingMessage, res);

			const {filePath, magnet} = incomingMessage.params;
			const btStream = createBTStream({
				dhtPort: Math.floor(Math.random() * 10000 + 1000),
				hash: magnet,
			});
			btStream_ = btStream;

			const torrent = await btStream.getMetaData(magnet);
			const file = torrent.files.find((it) => it.path === filePath);

			if (!file) {
				res.status(404);
				return;
			}

			const size = file.length;
			// const ranges = parseRange(size, incomingMessage.headers.range, {
			// 	combine: true
			// })[0];

			const byteRange = parseByteRange(incomingMessage, {
				size,
			});

			const headers = {};

			let status = 200;
			let startByte = 0;
			let length = size;
			const files = new Array(1);

			if (files.length == 1 && byteRange.valid) {
				if (byteRange.to < length) {

					// Note: HTTP Range param is inclusive
					startByte = byteRange.from;
					length = byteRange.to - byteRange.from + 1;
					status = 206;

					// Set Content-Range response header (we advertise initial resource size on server here (stat.size))
					headers['Content-Range'] = 'bytes ' + byteRange.from + '-' + byteRange.to + '/' + size;
					console.log('headers[\'Content-Range\']::', headers['Content-Range'])

				} else {
					byteRange.valid = false;
					console.warn("Range request exceeds file boundaries, goes until byte no", byteRange.to, "against file size of", length, "bytes");
				}
			}

			// if (ranges) {
			// 	const length = ranges.end - ranges.start + 1;
			// 	const range = contentRange('bytes', length, ranges);
			//
			// 	res.setHeader('Content-Range', range);
			// 	res.setHeader('Accepted-Range', 'bytes');
			// 	res.setHeader('Content-Length', length);
			// } else {
			// 	res.setHeader('Content-Length', size);
			// }

			// const offset = ranges ? ranges.start : 0;

			console.log('pre::download')
			const stream = btStream.downloadFileByPath({
				torrent,
				filePath,
				from: startByte,
				to: byteRange.to,
			});
			console.log('post::download')

			// headers['Content-Type']   = contentType;
			headers['Content-Length'] = length;

			Object.keys(headers).forEach((it) => {
				res.setHeader(it, headers[it]);
			});

			res.status(status, headers);
			stream.pipe(res);
		},

		d: async (incomingMessage, res) => {
			const {filePath, magnet} = incomingMessage.params;
			console.log(`============================================`)
			console.log("!!headers.range", incomingMessage.headers.range)
			// stream = fs.createReadStream(`${__dirname}/../../../../../../example/bbb.mp4`);
			// const stat = await promisify(fs.stat)(`${__dirname}/../../../../../../example/bbb.mp4`);
			const btStream = createBTStream({
				dhtPort: Math.floor(Math.random() * 10000 + 1000),
				hash: magnet
			});
			btStream_ = btStream;

			const torrent = await btStream.getMetaData(magnet);

			const file = torrent.files.find(it => it.path === filePath);
			const size = file.length;

			console.log("!!len", size)

			const ranges = parseRange(size, incomingMessage.headers.range, {
				combine: true
			})[0];

			if (ranges) {
				console.log(11111111111111111, {ranges})
				const length = ranges.end - ranges.start + 1;
				const range = contentRange('bytes', length, ranges);
				console.log("!!, range", range)

				res.setHeader('Content-Range', range);
				res.setHeader('Content-Length', size);

				// stream = fs.createReadStream(`${__dirname}/../../../../../../example/bbb.mp4`, {
				// 	start: ranges[0].start,
				// 	// end: len
				// });
			} else {
				res.setHeader('Content-Length', size);
			}


			const offset = ranges ? ranges.start : 0;
			const to = ranges ? ranges.end : size;
			console.log({offset, to})

			const stream = btStream.downloadFileByPath({
				torrent,
				filePath,
				offset,
				to,
			});

			console.log(`-----------------------------------------------`)

			stream.pipe(res);
		}
	};
	return o;
}


