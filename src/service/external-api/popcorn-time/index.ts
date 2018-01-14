import {IExternalApi, ICategory, IVideo} from '../i-external-api';

export default class PopcornTime implements IExternalApi {
	private apiUrl: string;
	private categories: ICategory[];

	constructor(apiUrl) {
		this.apiUrl = apiUrl;
		this.categories = this.createCategories();
	}

	getCategories(): Promise<ICategory[]> {
		return new Promise((resolve, reject) => {
			resolve(this.categories);
		});
	}

	getVideos(categoryId) {
		return fetch(this.apiUrl + categoryId + '/1')
			.then((response) => response.json())
			.then((videos) => videos.map((video) => this.makeVideo(video)))
			.catch((err) => {
				throw err;
			});
	}

	getVideo(imdbId) {
		return fetch(this.apiUrl + 'movie/' + imdbId)
			.then((response) => response.json())
			.then((video: IRAWVideo) => this.makeVideo(video))
			.catch((err) => {
				throw err;
			});
	}

	private makeVideo(rawVideo: IRAWVideo): IVideo {
		return {
			id: rawVideo.imdb_id,
			title: rawVideo.title,
			cover: rawVideo.images.banner,
			// TODO: Нужно решить что делать с этими параметрами
			duration: 0,
			views: 0
		};
	}

	private createCategories(): ICategory[] {
		return ['Anime', 'Movie', 'Show'].map((title, i) => ({
			id: title.toLocaleLowerCase() + 's',
			title: title,
			cover: ''// TODO: Add default pictures?
		}));
	}
}

interface IRAWVideo {
	imdb_id: string,
	title: string,
	images: {
		banner: string
	}
}
