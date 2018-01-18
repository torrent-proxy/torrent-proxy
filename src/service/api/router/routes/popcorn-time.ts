import IProxy from '../../../external-api/i-proxy';
import { stringify } from 'querystring';

export default (popcornTimeApi: IProxy) => {
	return {
		get: (incomingMessage, res) => {
			const query = stringify(incomingMessage.query);
			const url = query ? `${incomingMessage.params[0]}?${query}` : incomingMessage.params[0];

			return popcornTimeApi.proxy(url)
				.then((response) => res.send(response))
				.catch((err) => res.send(err));
		}
	}
}
