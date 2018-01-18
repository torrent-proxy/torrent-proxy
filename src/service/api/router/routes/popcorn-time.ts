import IProxy from '../../../external-api/i-proxy';

export default (popcornTimeApi: IProxy) => {
	return {
		get: (incomingMessage, res) => {
			console.log(incomingMessage.originalUrl);
			return popcornTimeApi.proxy(incomingMessage.originalUrl)
				.then((response) => res.send(response))
				.catch((err) => res.send(err));
		}
	}
}
