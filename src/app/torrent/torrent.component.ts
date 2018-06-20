import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client.service';
import { CONFIG } from "../config";


const FILE_LIST_LENGTH = 10;

@Component({
	selector: 'app-torrent',
	templateUrl: './torrent.component.html',
	styleUrls: ['./torrent.component.scss']
})

export class TorrentComponent implements OnInit {
	private files: any[] = [];
	private loading: boolean = false;
	private magnetLink: string = '';
	private serverUrl: string = CONFIG.BACKEND_URL;
	private currentListDisplay: number = 0;
	private itemsToShow: any[] = [];


	constructor( private restClientService : RestClientService) {

	}

	ngOnInit() {
	}

	buildFileList(magnet: string): void {
		this.currentListDisplay = 0;
		this.magnetLink = magnet;
		this.loading = true;
		this.getFileList()
			.then(() => this.loading = false)
	}

	getFileList():Promise<any> {
		return (this.restClientService.getFileList(this.magnetLink)
			.then(data => {
				this.files = data['files'];
				console.log(this.files);
				this.setDisplayedFiles(this.currentListDisplay);
			})
			.catch(err => {
				console.log(err);
			}))
	}

	setDisplayedFiles(listNumber: number):void {
		let fileList = this.files;
		this.currentListDisplay = listNumber;
		let firstItem: number = this.currentListDisplay * FILE_LIST_LENGTH;
		let lastItem: number = firstItem + FILE_LIST_LENGTH;

		if (lastItem > fileList.length) {
			lastItem = fileList.length;
		}

		this.itemsToShow = [];

		for (let i = firstItem; i < lastItem; i++) {
			this.itemsToShow.push(fileList[i]);
		}
	}

	getFileName(path: string): string {
		return (path.substr(0 ,path.lastIndexOf("."))).split(/[\\/]/).pop();
	}

	setDownloadUrl(path:string): string {
		return `${this.serverUrl}/download/${encodeURIComponent(this.magnetLink)}/${encodeURIComponent(path)}`;
	}

	getPagesCount(): number {
		return Math.ceil(this.files.length/FILE_LIST_LENGTH);
	}

	clearList(): void {
		this.files = [];
		this.itemsToShow = [];
		this.magnetLink = '';
	}

	isLoading(): boolean {
		return this.loading;
	}

	getFiles(): object {
		return this.itemsToShow;
	}

	getCurrentDisplayList(): number {
		return this.currentListDisplay;
	}

	getDummyArray(): any[] {
		return Array(this.getPagesCount());
	}
}
