import Transport from '../api/transport';
import IProxy from './i-proxy';

export default class PopcornTime implements IProxy {
	private transport: Transport;

	constructor(transport) {
		this.transport = transport;
	}

	proxy(url: string): Promise<any> {
		return this.transport.request(url)
			.catch((err) => {
				console.error(err);
				throw err;
			});
	}
}
