import PopcornTime from '../../../external-api/popcorn-time';

export default (popcornTimeApi: PopcornTime) => {
	return {
        categories: {
			get: (incomingMessage, res) => {
				return popcornTimeApi.getCategories()
					.then((categories) => res.send(categories))
					.catch((err) => res.send(err));
			}
		},
		videos: {
			get: (incomingMessage, res) => {
                return popcornTimeApi.getVideos(incomingMessage.params.categoryId)
                    .then((categories) => res.send(categories))
                    .catch((err) => res.send(err));
			}
		},
		video: {
			get: (incomingMessage, res) => {
                return popcornTimeApi.getVideo(incomingMessage.params.id)
                    .then((categories) => res.send(categories))
                    .catch((err) => res.send(err));
			}
		}
	}
}
