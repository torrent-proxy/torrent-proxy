export interface IExternalApi {
	getCategories(): Promise<ICategory[]>
	getVideos(categoryId: string): Promise<IVideo[]>
	getVideo(videoId: string): Promise<IVideo>
}

export interface ICategory {
	id: string,
	title: string,
	cover: string
}

export interface IVideo {
	id: string,
	title: string,
	cover: string,
	duration: number,
	views: number
}
