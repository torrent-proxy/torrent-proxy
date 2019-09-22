import {promisify} from  'util';
import {exec as execSync, spawn} from 'child_process';

const magnetURIDecode = require('magnet-uri');
const exec = promisify(execSync);

declare const Promise;

const SUCCESS_MOUNT_MESSAGE = `Got metadata. Now ready to start downloading.`;

const processes = [];

const createBTFSProcess = ({magnet, mountPoint}) => {
	return new Promise((resolve, reject) => {
		const btfsProcess = spawn(`btfs`,[`-f`, magnet, mountPoint], {});

		const onData = (data) => {
			if (String(data).includes(SUCCESS_MOUNT_MESSAGE)) {
				resolve({process: btfsProcess});
			}
		};

		const onError = (data) => {
			console.error(`stderr: ${data}`);
			reject(data);
		};

		const onClose = (code) => {
			console.log(`child process exited with code ${code}`);

			btfsProcess.stdout.removeListener('data', onData);
			btfsProcess.stderr.removeListener('data', onError);
			btfsProcess.removeListener('close', onClose);
		};

		btfsProcess.stdout.on('data', onData);
		btfsProcess.stderr.on('data', onError);
		btfsProcess.on('close', onClose);
	});
};

const saveProcess = ({process, hash, mountPoint}) => {
	// TODO: check magnet
	processes.push({process, hash, mountPoint});
};

const mount = ({magnet, mountPoint}) => {
	console.log('mount', {magnet, mountPoint});

	const hash = magnetURIDecode(magnet).infoHash;
	const _process = processes.find((it) => {
		return it.hash === hash;
	});

	if (_process) {
		// Нужно проверять и mountPoint
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		createBTFSProcess({magnet, mountPoint})
			.then(({process}) => {
				saveProcess({process, hash, mountPoint});
				resolve();
			})
			.catch(reject);
	});
};

const umount = ({mountPoint}) => {
	return exec(`sudo umount ${mountPoint}`);
};

const isMount = ({magnet}) => {
	const targetHash = magnetURIDecode(magnet);

	return !!processes.find(({hash}) => hash === targetHash);
};

export {mount, umount, isMount};
